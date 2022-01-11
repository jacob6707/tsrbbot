const mongoose = require('mongoose');
const Guild = require('../models/guild');
const config = require('../config.json');
const { Client } = require('discord.js');
const { loadLanguages } = require('../utils/language');

/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.prefix,
        color: config.color,
        razred: "2.A",
        broadcastChannelId: "0",
        printIzmjene: false
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!');

    loadLanguages(client);
};