const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const config = require('../../config.json');
const { get_settings } = require('../../utils/functions');
const language = require('../../utils/language');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Information',
    description: 'Displays bot help message.',
    usage: `help [commandName]`,
    run: async (client, message, args) => {
        const {guild} = message;
        const settings = await get_settings(guild);

        if (args[0]) {
            return getCMD(client, message, args[0], settings);
        } else {
            return helpMSG(client, message, settings);
        }
    }
}

async function helpMSG(client, message, settings) {
    const {guild} = message;

    const prefix = settings ? settings.prefix : config.prefix;

    const embed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('TSRB Bot')
        .setThumbnail(client.user.avatarURL())
        .setDescription(`${language(guild, 'HELP_COMMANDS')} \`${prefix}commands\` \n\n${language(guild, 'HELP_INFO')} \`${prefix}help <command>\` ${language(guild, 'HELP_INFO_WITHOUT')} \`<>\``)
        .addField(`${language(guild, 'HELP_ABOUT_BOT')}`, `${language(guild, 'HELP_MADE_BY')}`)
    message.channel.send({embeds: [embed]});
}

async function getCMD(client, message, input, settings) {
    const {guild} = message;

    const prefix = settings ? settings.prefix : config.prefix;
    const color = settings ? settings.color : config.color;

    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `${language(guild, 'HELP_NO_INFO')} **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send({embeds: [embed.setColor('#ff0000').setDescription(info)]});
    }

    if (cmd.name) info = `**${language(guild, 'HELP_COMMANDNAME')}**: ${cmd.name}`
    if (cmd.aliases) info += `\n**${language(guild, 'HELP_ALIASES')}**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**${language(guild, 'HELP_DESCRIPTION')}**: ${language(guild, `COMMANDS_${cmd.name.toUpperCase()}_DESC`)}`;
    if (cmd.usage) {
        info += `\n**${language(guild, 'HELP_USAGE')}**: ${prefix}${cmd.usage}`;
        embed.setFooter(`<> = ${language(guild, 'HELP_REQUIRED')} | [] = ${language(guild, 'HELP_OPTIONAL')}`)
    }
    if (cmd.usage2) info += `\n**${language(guild, 'HELP_USAGE2')}**: ${prefix}${cmd.usage2}`;

    return message.channel.send({embeds: [embed.setColor(color).setDescription(info)]});
}