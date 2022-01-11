const { Message, Client, Permissions } = require("discord.js");
const { Model } = require("mongoose");
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'class',
    aliases: ['class', 'razred'],
    category: 'Administration',
    description: 'Set class for schedule changes',
    usage: `class <class>`,
    /** @param {...Client} client
     * @param {...Message} message
     * @param {...String[]} args */
    run: async(client, message, args) => {
        const {guild} = message;
        message.delete();
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 10000)});
        };
        /** @type {...Model} */
        const settings = await get_settings(guild);
        if(!args[0]) return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 10000)});
        if (args[0].toLowerCase() == 'off') {
            await settings.updateOne({
                printIzmjene: false
            }, {}, {upsert: true})
            return message.channel.send(language(guild, 'CLASS_REMOVED'));
        }
        if (args[0]?.match("^([1-4]\.[ABCDEFGMNO])$") && args.length === 1 && args[0]) {
            await settings.updateOne({
                razred: args[0],
                printIzmjene: true
            }, {}, {upsert: true});
            return message.channel.send(`📘 ${language(guild, 'CLASS_SET')} ${args[0]}`);
        } else if(args.length > 1) {
            return message.channel.send(language(guild, 'ERR_ONEARG')).then(m => {setTimeout(() => m.delete(), 10000)});
        } else {
            return message.channel.send(language(guild, 'ERR_NOCLASS')).then(m => {setTimeout(() => m.delete(), 10000)});
        }
    },
};