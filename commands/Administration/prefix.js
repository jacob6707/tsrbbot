const { MessageEmbed, Permissions } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.json');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'prefix',
    category: 'Administration',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    run: async (client, message, args) => {
        const {guild} = message;
        message.delete();

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            return message.channel.send(language(guild, 'ERR_NOPERM')).then(m => {setTimeout(() => m.delete(), 10000)});
        };

        const settings = await get_settings(guild);
        if (args.length < 1) {
            return message.channel.send(`${language(guild, 'ERR_NOPREFIX')} \`${settings.prefix}\``).then(m => {setTimeout(() => m.delete(), 10000)});
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`${language(guild, 'PREFIX_CHANGED')} \`${args[0]}\``);
    }
}