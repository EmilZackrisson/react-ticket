const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config()

const hook = new Webhook(process.env.DISCORD_WEBHOOK);


function sendNewissue(issue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);
    const issue = issue.issue;
    const senderName = issue.SenderName;

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

function sendChangedissue(issue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + issue.id + " | " + issue.issue;
    const field = "#" + issue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(issue.issue)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, issue.issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ff0000')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problem uppdaterat')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendCompleted(issue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + issue.id + " | " + issue.issue;
    const field = "#" + issue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(issue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, issue.issue) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#00FF00')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problemet rapporterat som klart')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendNotCompleted(issue) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + issue.id + " | " + issue.issue;
    const field = "#" + issue.id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(issue.SenderName)
        .setURL(process.env.REACT_TICKET_URL)
        .addField(field, issue.issue) //Problem
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