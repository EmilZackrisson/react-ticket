const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config()

const hook = new Webhook(process.env.DISCORD_WEBHOOK);


function sendNewIssue(newestIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);
    const issue = newestIssue.issue;
    const senderName = newestIssue.SenderName;

    const title = "#" + newestIssue.id + " | " + issue;
    const field = "#" + newestIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(senderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ff0000')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Nytt problem rapporterat')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendChangedIssue(newestIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + newestIssue.id + " | " + newestIssue.Issue;
    const field = "#" + newestIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(newestIssue.Issue)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, newestIssue.Issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ff0000')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problem uppdaterat')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendCompleted(newestIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + newestIssue.id + " | " + newestIssue.Issue;
    const field = "#" + newestIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(newestIssue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, newestIssue.Issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#00FF00')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problemet rapporterat som klart')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendNotCompleted(newestIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + newestIssue.id + " | " + newestIssue.Issue;
    const field = "#" + newestIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(newestIssue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, newestIssue.Issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ffa500')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Klar-rapporten har dragigts tillbaka')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}



module.exports = { sendNewIssue, sendCompleted, sendNotCompleted, sendChangedIssue };