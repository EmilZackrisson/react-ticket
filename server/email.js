const axios = require('axios');
require("dotenv").config();


function sendNewIssue(issueObj) {
    // send email

    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    // const issue = issueObj.issue.issue;
    const issue = JSON.parse(issueObj.issue);

    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Nytt problem #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    if(email !== process.env.ADMIN_EMAIL){
        var to = [
            {
                "email": email,
                "name": name
            },
            {
                "email": process.env.ADMIN_EMAIL,
                "name": process.env.ADMIN_NAME
            }
        ]
    } else{
        var to = [
            {
                "email": email,
                "name": name
            }
        ]
    }

    console.log("sending email to: ", to);
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': to,
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
    console.log(response);
}

function issueSolved(issueObj){
    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    // const issue = issueObj.issue.issue;
    const issue = JSON.parse(issueObj.issue);
    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Problem löst #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    if(email !== process.env.ADMIN_EMAIL){
        var to = [
            {
                "email": email,
                "name": name
            },
            {
                "email": process.env.ADMIN_EMAIL,
                "name": process.env.ADMIN_NAME
            }
        ]
    } else{
        var to = [
            {
                "email": email,
                "name": name
            }
        ]
    }

    console.log("sending email");
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': to,
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
    console.log(response);
}

function issueChanged(issueObj){
    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    // const issue = issueObj.issue.issue;
    const issue = JSON.parse(issueObj.issue);
    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Problem uppdaterat #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    if(email !== process.env.ADMIN_EMAIL){
        var to = [
            {
                "email": email,
                "name": name
            },
            {
                "email": process.env.ADMIN_EMAIL,
                "name": process.env.ADMIN_NAME
            }
        ]
    } else{
        var to = [
            {
                "email": email,
                "name": name
            }
        ]
    }

    console.log("sending email");
    const response = axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        // '{  \n   "sender":{  \n      "name":"Sender Alex",\n      "email":"senderalex@example.com"\n   },\n   "to":[  \n      {  \n         "email":"testmail@example.com",\n         "name":"John Doe"\n      }\n   ],\n   "subject":"Hello world",\n   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"\n}',
        {
            'sender': {
                'name': 'React Ticket',
                'email': process.env.SMTP_ADDRESS
            },
            'to': to,
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
    console.log(response);
}

function test(issueObj) {
    // send email

    const name = issueObj.senderName;
    const email = issueObj.senderEmail;
    // const issue = issueObj.issue.issue;
    const issue = JSON.parse(issueObj.issue);

    const id = issueObj.id;
    const subject = "Nytt problem - #" + id;
    const content = "<body><h1>Nytt problem #" + id + "</h1><h3>Rapporterad av " + name + " | <a href:mailto=" + email + ">" + email + "</a></h3><p>" + issue + "</p></body>"

    try{
        const issue = JSON.parse(issueObj.issue);
        const name = issueObj.senderName;
        const email = issueObj.senderEmail;
    }
    catch(error){
        console.log("email.test error: ", error)
        console.map("Issue Object: ", issueObj)
        console.log("Issue: ", issue);
    }
}


module.exports = { sendNewIssue, issueSolved, issueChanged, test };