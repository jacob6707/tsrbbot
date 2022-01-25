const { Message, Permissions } = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: 'cleararr',
    category: 'Administration',
    description: 'Clears izmjene array',
    usage: `cleararr`,
    dev_only: true,
    /** @param {...Message} message */
    run: (client, message, args) => {
        message.delete();
        if (message.member.id != "263007401144352769") {
            return message.channel.send('Nisi moj vladar pička ti materina').then(m => {setTimeout(() => m.delete(), 10000)});
        };
        client.izmjeneA = [];
        client.izmjeneB = [];
        func.get_izmjene(client, config.aSmjena);
    },
};