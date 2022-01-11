const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.json');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'commands',
    aliases: ['c'],
    category: 'Information',
    description: 'Displays a full list of bot commands.',
    usage: `commands`,
    run: async (client, message) => {
        return getAll(client, message);
    }
}

async function getAll(client, message) {
    const {guild} = message
    const settings = await get_settings(guild);
    
    const prefix = settings ? settings.prefix : config.prefix;
    const color = settings ? settings.color : config.color;

    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`${language(guild, 'COMMANDS_COMMANDLIST')}`)
    .setThumbnail(client.user.avatarURL());
    
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category && !cmd.dev_only)
            .map(cmd => `\`${prefix + cmd.name}\``)
            .join(', ');
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0] + cat.slice(1)}** : ${commands(cat)}`)
        .reduce((string, category) => `${string}\n\n${category}`);

    return message.channel.send({embeds: [embed.setDescription(`${language(guild, 'COMMANDS_USE')} \`` + (`${prefix}help <commandName>\` ${language(guild, 'HELP_INFO_WITHOUT')} \`<>\` ${language(guild, 'COMMANDS_MOREINFORMATION')}\n\n${info}`))]});
}