const { Message, Client, Permissions } = require("discord.js");
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'channel',
    category: 'Administration',
    description: 'Postavi kanal za izmjene',
    usage: `channel <channel>`,
    /** @param {...Client} client
     * @param {...Message} message
     * @param {...String[]} args */
    run: async(client, message, args) => {
        const {guild} = message;
        message.delete();
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 10000)});
        };
        const settings = await get_settings(guild);
        if(!args[0]) return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 10000)});
        if (args[0]?.match(/<#\d{18}>$/) && client.channels.cache.get(args[0].replace(/\D/g,'')) && args.length === 1) {
            var id = args[0].replace(/\D/g,'');
            await settings.updateOne({
                broadcastChannelId: id
            });
            return message.channel.send(`${language(guild, 'CHANNEL_SET')} <#${id}>`);
        } else if(args.length > 1) {
            return message.channel.send(language(guild, 'ERR_ONEARG')).then(m => {setTimeout(() => m.delete(), 10000)});
        } else {
            return message.channel.send(`${language(guild, 'ERR_NOCHANNEL')} ${args[0]}`).then(m => {setTimeout(() => m.delete(), 10000)});
        }
    },
};