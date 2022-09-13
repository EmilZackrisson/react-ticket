const axios = require('axios');


function sendNewIssue(issueObj) {
    // send email

    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    try {
        var issueJson = JSON.parse(issueObj.issue);
        const issueLength = issueJson.length;
        console.log(issueJson);

        var issue = issueJson.issue;
      } catch (e) {
        var issue = val.issue;
      }
    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Nytt problem #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    console.log("sending email");
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': [
                {
                    'email': email,
                    'name': name
                }
            ],
            'subject': subject,
            'htmlContent': content
        },
        {
            headers: {
                'accept': 'application/json',
                'api-key': process.env.SENDINBLUE_API_KEY,
                'content-type': 'application/json'
            }
        }
    );
}

function issueSolved(issueObj){
    const name = issueObj.senderName;
    const email = issueObj.senderEmail;

    try {
        var issueJson = JSON.parse(issueObj.issue);
        const issueLength = issueJson.length;
        console.log(issueJson);

        var issue = issueJson.issue;
      } catch (e) {
        var issue = val.issue;
      }

    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Problem löst #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    console.log("sending email");
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': [
                {
                    'email': email,
                    'name': name
                }
            ],
            'subject': subject,
            'htmlContent': content
        },
        {
            headers: {
                'accept': 'application/json',
                'api-key': process.env.SENDINBLUE_API_KEY,
                'content-type': 'application/json'
            }
        }
    );
}

function issueChanged(issueObj){
    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    try {
        var issueJson = JSON.parse(issueObj.issue);
        const issueLength = issueJson.length;
        console.log(issueJson);

        var issue = issueJson.issue;
      } catch (e) {
        var issue = val.issue;
      }
    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Problem uppdaterat #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    console.log("sending email");
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': [
                {
                    'email': email,
                    'name': name
                }
            ],
            'subject': subject,
            'htmlContent': content
        },
        {
            headers: {
                'accept': 'application/json',
                'api-key': process.env.SENDINBLUE_API_KEY,
                'content-type': 'application/json'
            }
        }
    );
}


module.exports = { sendNewIssue, issueSolved, issueChanged };