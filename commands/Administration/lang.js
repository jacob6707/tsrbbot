const { Message, Client, Permissions } = require("discord.js");
const languageSchema = require('../../models/language-schema');
const { languages } = require('../../lang.json');
const { get_lang } = require("../../utils/functions");
const { Model } = require("mongoose");
const { setLanguage } = require('../../utils/language');
const language = require('../../utils/language');

module.exports = {
    name: 'lang',
    aliases: ['lang', 'language', 'locale'],
    category: 'Administration',
    description: 'Set bot language',
    usage: `lang <language>`,
    /** @param {...Client} client
     * @param {...Message} message
     * @param {...String[]} args */
    run: async(client, message, args) => {
        const { guild } = message;
        /** @type {Model} */
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 10000)});
        };
        if(!args[0]) return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 10000)});
        const targetLang = args[0].toLowerCase();
        message.delete();
        if (!languages.includes(targetLang)) return message.channel.send(language(guild, 'ERR_NOLANG')).then(m => {setTimeout(() => m.delete(), 10000)});
        setLanguage(guild, targetLang);
        await languageSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            language: targetLang
        }, {upsert: true});
        message.channel.send(language(guild, 'LANG_SET')).then(m => {setTimeout(() => m.delete(), 10000)});
    },
};