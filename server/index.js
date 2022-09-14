const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const discord = require("./discord.js");
const email = require("./email.js");
// const higestId = require("./highestId.js")
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const path = require("path");
const { stringify } = require("querystring");

require("dotenv").config();
// console.log(process.env) // remove this after you've confirmed it working

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, "ssl", "emilzackrisson.tk.crt")),
  key: fs.readFileSync(path.join(__dirname, "ssl", "emilzackrisson.tk.key")),
};

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000', 'https://ticket.emilzackrisson.se', 'http://192.168.1.69:3000', 'https://ticket-api.emilzackrisson.se']
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  // console.log("got get req", req)
  res.send("Hej! Du hittade API:n för React Ticket.");
});

app.get("/api/get", (req, res) => {
  // console.log("got get req", req)
  const sqlSelect = "SELECT * FROM tickets ORDER BY priority DESC";
  console.log("got get req");
  db.query(sqlSelect, (err, result) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result);
    if (err) {
      console.log(err);
    }
  });
});

app.get("/api/listUsers", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result);
    if (err) {
      console.log(err);
    }
  });
});

app.post("/api/user", (req, res) => {
  // console.log("hej");
  const email = req.body.email;
  const values = [email];
  const sqlSelect =
    "SELECT * FROM users WHERE email = " + db.escape(email) + ";";
  db.query(sqlSelect, [values], (err, result) => {
    // console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result);
    console.log("got user on request: ", result);
    if (err) {
      console.log(err);
      // console.log(result);
    }
  });
});

app.post("/api/userLoggedIn", (req, res) => {
  // console.log("hej");
  const date = new Date();
  const time = date.getTime();

  const email = req.body.email;

  const sqlSelect =
    "UPDATE users SET lastLogin = " +
    db.escape(time) +
    " WHERE email = " +
    db.escape(email) +
    ";";
  db.query(sqlSelect, (err, result) => {
    // console.log(result);
    if (err) {
      console.log(err);
    }
  });
});

app.post("/api/userActive", (req, res) => {
    // console.log("hej");
    const date = new Date();
    const time = date.getTime();

    const email = req.body.email;

    const sqlSelect = "UPDATE users SET lastActive = " + db.escape(time) + " WHERE email = " + db.escape(email) + ";";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        if (err) {
            console.log(err);
            res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(500);
        }
        else{
          res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(200);
        }
    })
})

app.post("/api/user/add", (req, res) => {
  // console.log("hej");
  const name = req.body.name;
  const email = req.body.email;
  const hash = req.body.hash;
  const permissionLevel = req.body.permissionLevel;
  const timeCreated = new Date();

  const values = [name, email, hash, permissionLevel, timeCreated];

  const sqlSelect =
    "INSERT INTO users (name, email, hash, permissionlevel, timeCreated) VALUES(?);";
  db.query(sqlSelect, [values], (err, result) => {
    // console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result);
    console.log("added user: ", result);
    if (err) {
      console.log(err);
      // console.log(result);
    }
  });
});

app.post("/api/createIssue", (req, res) => {
  const senderName = req.body.senderName;
  var issue = String(req.body.issue);

  // const complete = req.body.complete;
  const complete = 0;
  const email = req.body.senderEmail;
  const category = req.body.category;
  const time = Date.now();
  const priority = req.body.priority;

  const issueJson = { "issue": issue, "timestamp": time };

  console.log(req.body);

  if ((senderName == "") | (issue == "") | (email == "")) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendStatus(406).send("Not Acceptable");
    return;
  }

  let values = [
    senderName,
    JSON.stringify(issueJson),
    complete,
    email,
    category,
    time,
    priority
  ];
  console.log(values);

  // const sqlInsert = "INSERT INTO tickets (senderName, issue, complete, senderEmail, category, timestamp) VALUES(?);";
  const sqlInsert =
    "INSERT INTO tickets (senderName, issue, complete, senderEmail, category, timestamp, priority) VALUES(?);";

  db.query(sqlInsert, [values], (err, result) => {
    if (err) {
      console.log(sqlInsert);
      console.log(err);

      res.sendStatus(500);
      // res.send("error från server");
    } else {
      console.log("new issue reported and inserted");
      res.header("Access-Control-Allow-Origin", "*");
      res.sendStatus(200);
      notifyNewIssue();
    }
  });
});

//Update complete in mysql
app.post("/api/patch/complete", (req, res) => {
  const id = req.body.id;
  const complete = req.body.complete;
  const values = [id, complete];

  if (!id) {
    res.sendStatus(500);
    res.send("no id");
  }

  console.log("ID: ", id, " complete: ", complete);
  // console.log(req.body);

  const sqlInsert =
    "UPDATE tickets SET complete = " +
    db.escape(complete) +
    " " +
    "WHERE id = " +
    db.escape(id) +
    "";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).send(err);
    } else {
      res.send("Update completed succesful");
      notifySolvedIssue(id, complete);
    }
  });
});

//Update complete in mysql
app.patch("/api/patch/priority", (req, res) => {
  const id = req.body.id;
  const priority = req.body.priority;
  const values = [id, priority];

  if (!id) {
    res.sendStatus(500);
    res.send("no id");
  }

  console.log("ID: ", id, " priority: ", priority);
  // console.log(req.body);

  const sqlInsert =
    "UPDATE tickets SET priority = " +
    db.escape(priority) +
    " " +
    "WHERE id = " +
    db.escape(id) +
    "";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).send(err);
    } else {
      res.send("Update priority succesful");
      // notifySolvedIssue(id, priority);
    }
  });
});

//Update issue
app.patch("/api/patch/issue", (req, res) => {
  const id = req.body.id;
  const issue = req.body.issue;
  const updater = req.body.updater;

  console.log(id, issue);

  var issueLength;
  var issues = new Array();

  if (id >= 129) {
    const sqlGet = "SELECT issue FROM tickets WHERE id = " + db.escape(id) + ";";
    console.log(sqlGet);
    db.query(sqlGet, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).send(err);
      } else {
        // console.log(result);
        issuesDb = JSON.parse(result[0].issue);
        console.log("raw from db: ", result[0].issue)
        console.log("issue from db: ", issuesDb);
        issueLength = issues.length;

        issues.push(issuesDb);
        // issues = result[0].issue;
        
        console.log("issueLength: ", issueLength);
        console.log("issues: ",issues);

        var issueUpdate = {
          "issue": issue,
          "updater": updater,
          "timestamp": Date.now()
        }
        issues.push(issueUpdate);
        // console.log("Issue update object: ",issueUpdate);
      
        
        // console.log("All issues after push",issues);
      
      
        console.log("issues after update:", issues)
      
        const sqlInsert =
          "UPDATE tickets SET issue = " +
          db.escape(JSON.stringify(issues)) +
          " WHERE id = " +
          db.escape(id) +
          ";";
        db.query(sqlInsert, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500).send(err);
          } else {
            // notifyChangedIssue();
            res.send("Update issue succesful");
          }
        });
      }
    });
  }

  
});

//Update category
app.patch("/api/patch/category", (req, res) => {
  const id = req.body.id;
  const category = req.body.category;

  console.log("got category update", req.body);

  const sqlInsertCategory =
    "UPDATE tickets SET category = " +
    db.escape(category) +
    " WHERE id = " +
    db.escape(id) +
    ";";

  db.query(sqlInsertCategory, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).send(err);
    } else {
      res.send("Update category succesful");
    }
  });
});

app.post("/api/delete/issue", (req, res) => {
  const id = req.body.id;
  console.log(req.body);

  // res.sendStatus(500);

  const sqlDelete = "DELETE FROM tickets WHERE id = " + db.escape(id) + ";";
  db.query(sqlDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      // res.send(err);
    } else {
      res.send("delete succesful");
    }
  });
});

app.get("/api/test/email", (req, res) => {
  const body = req.body;

  console.log("test hej");

  res.send("hej");
});

function notifyNewIssue() {
  const sqlSelectHigestId =
    "SELECT * FROM tickets WHERE id = ( SELECT MAX(id) FROM tickets );";
  db.query(sqlSelectHigestId, (err, result) => {
    const newestIssue = result[0];
    // console.log(newestIssue.id);
    const newestId = newestIssue.id;
    console.log("Newest id: ", newestId);

    // email.sendNewIssue(newestIssue);
    discord.sendNewIssue(
      newestIssue.issue,
      newestIssue.senderName,
      newestIssue.id
    );
  });
}

function notifySolvedIssue(id, complete) {
  if (complete === 1) {
    const sqlSelectHigestId = "SELECT * FROM tickets WHERE id = " + id + ";";
    db.query(sqlSelectHigestId, (err, result) => {
      const solvedIssue = result[0];
      // console.log(newestIssue.id);
      // console.log("Newest id: ", newestId)

      discord.sendCompleted(solvedIssue.issue, solvedIssue.senderName, id);
      email.issueSolved(solvedIssue);
    });
  }
  if (complete === 0) {
    const sqlSelectHigestId = "SELECT * FROM tickets WHERE id = " + id + ";";
    db.query(sqlSelectHigestId, (err, result) => {
      const solvedIssue = result[0];
      // console.log(newestIssue.id);
      // console.log("Newest id: ", newestId)

      discord.sendNotCompleted(solvedIssue.issue, solvedIssue.senderName, id);
    });
  }
}

function notifyChangedIssue() {
  const sqlSelectHigestId =
    "SELECT * FROM tickets WHERE id = ( SELECT MAX(id) FROM tickets );";
  db.query(sqlSelectHigestId, (err, result) => {
    const changedIssue = result[0];
    // console.log(newestIssue.id);
    // const newestId = changedIssue.id;
    // console.log("Newest id: ", newestId)

    email.issueChanged(changedIssue);
    discord.sendChangedIssue(
      changedIssue.issue,
      changedIssue.senderName,
      changedIssue.id
    );
  });
}

app.listen(3001, function (err) {
  if (err) {
    throw err;
  }

  console.log("Server started on port 3001");
});

https.createServer(httpsOptions, app).listen(3443, function () {
  console.log("Serving app at https://localhost:3443");
});
