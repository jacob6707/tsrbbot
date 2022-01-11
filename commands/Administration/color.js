const { Message, Client, Permissions, MessageEmbed } = require("discord.js");
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'color',
    category: 'Administration',
    description: 'Set embed color (in hex: #FF0000 - red)',
    usage: `color <color>`,
    /** @param {...Client} client
     * @param {...Message} message
     * @param {...String[]} args */
    run: async(client, message, args) => {
        const {guild} = message;
        message.delete();
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 10000)});
        };
        if(!args[0]) return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 10000)});
        const settings = await get_settings(guild);
        
        if (args[0]?.match(/#.{6}$/) && args.length === 1) {
            await settings.updateOne({
                color: args[0]
            });
            const embed = new MessageEmbed()
            .setColor(args[0])
            .setTitle(language(guild, 'EMBED_COLORCHANGED_TITLE'))
            .setDescription(`${language(guild, 'EMBED_COLORCHANGED_DESC')} ${args[0]}.`);
            return message.channel.send({embeds: [embed]});
        } else if(args.length > 1) {
            return message.channel.send(language(guild, 'ERR_ONEARG')).then(m => {setTimeout(() => m.delete(), 10000)});
        } else {
            return message.channel.send(language(guild, 'ERR_NOCOLOR')).then(m => {setTimeout(() => m.delete(), 10000)});
        }
    },
};