const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const db = mysql.createPool({
    host: "192.168.1.20",
    port: "3307",
    user: "react-ticket",
    password: "react-ticket",
    database: "react-ticket"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM tickets";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/insert', (req, res) => {

    const senderName = req.body.senderName;
    const issue = req.body.issue;
    const complete = req.body.complete;

    // const senderName = "Emil";
    // const issue = "req.body.issue";
    // const complete = false;

    // console.log(senderName, issue, complete);

    const sqlInsert = "INSERT INTO tickets (senderName, issue, complete) VALUES ('" + senderName + "', '" + issue + "', '" + complete + "' );"
    db.query(
        sqlInsert,
        [senderName, issue, complete],
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                res.sendStatus(200);
            }
        })
})

//Update complete in mysql
app.patch('/api/patch/complete', (req, res) => {
    
    const id = req.body.id;
    const complete = req.body.complete;

    console.log("ID: ", id, " complete: ", complete);
    console.log(req.body);

    const sqlInsert = "UPDATE tickets SET complete = " + complete + " " + "WHERE id = " + id + "";
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.send(500, err);
        }
        else {
            res.send("Update completed succesful");
        }
    })
})

app.delete("/api/delete", (req, res) => {
    
    const id = req.body.id;

    const sqlInsert = "DELETE FROM tickets WHERE id = " + id + "";
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.send(500, err);
        }
        else {
            res.send("Update completed succesful");
        }
    })
})

app.post("/api/post/test", (req, res) => {
    const body = req.body;

    res.send(body);
})

app.listen(3001, function (err) {
    if (err) {
        throw err
    }

    console.log('Server started on port 3001')
})



