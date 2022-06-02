const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const discord = require("./discord.js");
const higestId = require("./highestId.js")
// const bodyParser = require("body-parser");

// if(process.env.MYSQL_HOST != ""){
//     const host = process.env.MYSQL_HOST;
//     const port = process.env.MYSQL_PORT;
//     const user = process.env.MYSQL_USER;
//     const pass = process.env.MYSQL_PASS;
//     const database = process.env.MYSQL_DATABASE;
// } else{
//     const mySqlost = "192.168.1.20";
//     const port = "3307";
//     const user = "react-ticket";
//     const pass = "react-ticket";
//     const database = "react-ticket";
// }

const db = mysql.createPool({
    host: "192.168.1.20",
    port: "3307",
    user: "react-ticket",
    password: "react-ticket",
    database: "react-ticket"
})


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

// discord.send("Hej", "Emil", 51);



app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM tickets";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        // console.log(result)
        // notifyNewIssue(result);
    })
})

app.post('/api/insert', (req, res) => {

    const senderName = req.body.senderName;
    const issue = req.body.issue;
    const complete = req.body.complete;
    const email = req.body.senderEmail;

    if(senderName == "" | issue == "" | email == ""){
        res.sendStatus(406).send("Not Acceptable");
        return;
    }

    const sqlInsert = "INSERT INTO tickets (senderName, issue, complete, senderEmail) VALUES ('" + senderName + "', '" + issue + "', '" + complete + "', '" + email + "' );"
    db.query(
        sqlInsert,
        [senderName, issue, complete, email],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
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

    if(!id){
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

app.post("/api/post/test", (req, res) => {
    const body = req.body;

    res.send(body);
})

function notifyNewIssue(json){
    
    let newestId = higestId.higest(json);
    let newestIssue;
    // console.log(newestIssue)
    // discord.send("hej", "hej", 69)

    const sqlSelect = "SELECT * FROM tickets WHERE id = " + newestId;
    db.query(sqlSelect, (err, result) => {
        newestIssue = result.id
        console.log(newestIssue);
    })

}

app.listen(3001, function (err) {
    if (err) {
        throw err
    }

    console.log('Server started on port 3001')
})



