const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const { get_settings } = require('../../utils/functions');
const config = require('../../config.json');
const language = require('../../utils/language');

module.exports = {
    name: 'ping',
    category: 'Information',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    run: async (client, message, args) => {
        const {guild} = message;
        const settings = await get_settings(message.guild);
        const color = settings.color || config.color;
        const msg = await message.channel.send('🏓 Pinging...');

        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('🏓 Pong!')
        .setDescription(`${language(guild, 'BOT_LATENCY')} **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \n${language(guild, 'API_LATENCY')} **${Math.round(client.ws.ping)} ms**`);

        message.channel.send({embeds: [embed]});
    }
}