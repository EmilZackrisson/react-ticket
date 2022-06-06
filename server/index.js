const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const discord = require("./discord.js");
const email = require("./email.js");
const higestId = require("./highestId.js")
const bodyParser = require("body-parser");

require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it working


const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://ticket.emilzackrisson.tk', 'http://192.168.1.69:3000']
// }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/api/get", (req, res) => {
    // console.log("got get req", req)
    const sqlSelect = "SELECT * FROM tickets";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) {
            console.log(err);
        }
    })
})

app.get("/api/test/id", (req, res) => {
    notifyNewIssue();
    res.send("hello")
})

app.post('/api/insert', (req, res) => {

    const senderName = req.body.senderName;
    var issue = String(req.body.issue);
    // const complete = req.body.complete;
    const complete = 0;
    const email = req.body.senderEmail;

    console.log(req.body);

    if (senderName == "" | issue == "" | email == "") {
        res.sendStatus(406).send("Not Acceptable");
        return;
    }

    const sqlInsert = "INSERT INTO tickets (senderName, issue, complete, senderEmail) VALUES ('" + senderName + "', '" + issue + "', '" + complete + "', '" + email + "' );"
    db.query(
        sqlInsert,
        [senderName, issue, complete, email],
        (err, result) => {
            if (err) {
                console.log(sqlInsert)
                console.log(err);

                res.sendStatus(500);
                // res.send("error från server");
            }
            else {

                res.sendStatus(200);
                notifyNewIssue();
            }
        })
})

//Update complete in mysql
app.post('/api/patch/complete', (req, res) => {

    const id = req.body.id;
    const complete = req.body.complete;

    if (!id) {
        res.sendStatus(500);
        res.send("no id")
    }

    console.log("ID: ", id, " complete: ", complete);
    // console.log(req.body);

    const sqlInsert = "UPDATE tickets SET complete = " + complete + " " + "WHERE id = " + id + "";
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500).send(err);
        }
        else {
            res.send("Update completed succesful");
            notifySolvedIssue(id, complete);
        }
    })
})

//Update issue
app.patch('/api/patch/issue', (req, res) => {

    const id = req.body.id;
    const issue = req.body.issue;

    console.log("ID: ", id, " issue: ", issue);
    console.log(req.body);

    const sqlInsert = "UPDATE tickets SET issue = '" + issue + "' WHERE id = '" + id + "';";
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500).send(err);
        }
        else {
            res.send("Update issue succesful");
        }
    })
})

app.post("/api/delete/issue", (req, res) => {

    const id = req.body.id;
    console.log(req.body);

    // res.sendStatus(500);

    const sqlDelete = "DELETE FROM tickets WHERE id = " + id + ";";
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            // res.send(err);
        }
        else {
            res.send("delete succesful");
        }
    })
})

app.get("/api/test/email", (req, res) => {
    const body = req.body;

    console.log("test hej")

    

    res.send("hej");

    
    
})

function notifyNewIssue() {

    const sqlSelectHigestId = "SELECT * FROM tickets WHERE id = ( SELECT MAX(id) FROM tickets );"
    db.query(sqlSelectHigestId, (err, result) => {

        const newestIssue = result[0];
        // console.log(newestIssue.id);
        const newestId = newestIssue.id;
        console.log("Newest id: ", newestId)

        email.sendNewIssue(newestIssue);
        discord.send(newestIssue.issue, newestIssue.senderName, newestIssue.id)
    })
}

function notifySolvedIssue(id, complete) {


    if (complete === 1) {
        const sqlSelectHigestId = "SELECT * FROM tickets WHERE id = " + id + ";"
        db.query(sqlSelectHigestId, (err, result) => {

            const solvedIssue = result[0];
            // console.log(newestIssue.id);
            // console.log("Newest id: ", newestId)

            discord.sendCompleted(solvedIssue.issue, solvedIssue.senderName, id)
        })
    }
    if (complete === 0) {
        const sqlSelectHigestId = "SELECT * FROM tickets WHERE id = " + id + ";"
        db.query(sqlSelectHigestId, (err, result) => {

            const solvedIssue = result[0];
            // console.log(newestIssue.id);
            // console.log("Newest id: ", newestId)

            discord.sendNotCompleted(solvedIssue.issue, solvedIssue.senderName, id)
        })
    }


}

app.listen(3001, function (err) {
    if (err) {
        throw err
    }

    console.log('Server started on port 3001')
})



