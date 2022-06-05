const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/981989958669717564/ch_vTU2Rq445EiBIhAXmZ_kPRDVBLWA_OKTQyteR67w103seZYqDaFW2T7pROa7agXaW");


function send(message, sender, id) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + id + " | " + message;
    const field = "#" + id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(sender)
        .setURL('http://localhost:3000/')
        .addField(field, message) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ff0000')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Nytt problem rapporterat')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendCompleted(message, sender, id) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + id + " | " + message;
    const field = "#" + id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(sender)
        .setURL('http://localhost:3000/')
        .addField(field, message) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#00FF00')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Problemet rapporterat som klar')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}

function sendNotCompleted(message, sender, id) {
    // const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    hook.setUsername('react-ticket');
    // hook.setAvatar(IMAGE_URL);

    const title = "#" + id + " | " + message;
    const field = "#" + id + "";

    const embed = new MessageBuilder()
        .setTitle(title)
        .setAuthor(sender)
        .setURL('http://localhost:3000/')
        .addField(field, message) //Problem
        // .addField('Second field', 'this is not inline')
        .setColor('#ffa500')
        // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Klar-rapporten har dragigts tillbaka')
        // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    hook.send(embed);
}



module.exports = { send, sendCompleted, sendNotCompleted };