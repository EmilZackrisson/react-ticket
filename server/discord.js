const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config()

const hook = new Webhook(process.env.DISCORD_WEBHOOK);


function sendNewissue(newIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);
    const issue = newIssue.issue;
    const senderName = newIssue.SenderName;

    const title = "#" + issue.id + " | " + issue;
    const field = "#" + issue.id + "";

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

function sendChangedissue(changedIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + changedIssue.id + " | " + changedIssue.issue;
    const field = "#" + changedIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(changedIssue.issue)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, changedIssue.issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ff0000')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problem uppdaterat')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendCompleted(completedIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + completedIssue.id + " | " + completedIssue.issue;
    const field = "#" + completedIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(completedIssue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, completedIssue.issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#00FF00')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problemet rapporterat som klart')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendNotCompleted(notCompletedIssue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + notCompletedIssue.id + " | " + notCompletedIssue.issue;
    const field = "#" + notCompletedIssue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(notCompletedIssue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, notCompletedIssue.issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ffa500')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Klar-rapporten har dragigts tillbaka')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}



module.exports = { sendNewissue, sendCompleted, sendNotCompleted, sendChangedissue };