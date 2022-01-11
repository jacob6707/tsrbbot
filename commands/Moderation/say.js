const { MessageEmbed, Client, Message, Permissions } = require('discord.js');
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const config = require('../../config.json')
const language = require('../../utils/language');

module.exports = {
    name: 'say',
    category: 'Moderation',
    description: 'Bot repeats what you tell it to.',
    usage: `say [embed] <message>`,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async(client, message, args) => {
        const {guild} = message;
        message.delete();

        const settings = await get_settings(message.guild);

        const color = settings.color || config.color;

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 5000)});
        
        if (args.length < 1)
            return message.channel.send(language(guild, 'ERR_NOARGS')).then(m => {setTimeout(() => m.delete(), 5000)});

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(args.slice(1).join(' '))

            message.channel.send({embeds: [embed]});
        } else {
            message.channel.send(args.join(' '));
        }
    }
}