const languageSchema = require('../models/language-schema');
const lang = require('../lang.json');
const { Client } = require('discord.js');

// { 'guildId': 'language' }
const guildLanguages = {}

/**
 * 
 * @param {Client} client 
 */
const loadLanguages = async (client) => {
    for(const guild of client.guilds.cache) {
        const guildId = guild[0];

        const result = await languageSchema.findOne({
            _id: guildId,
        });

        guildLanguages[guildId] = result ? result.language : 'english';
    }
    return `Successfully loaded languages of ${Object.keys(guildLanguages).length} servers`;
}

const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase();
}

module.exports = (guild, textId) => {
    if (!lang.translations[textId]) {
        return textId;
    }
    const selectedLanguage = guildLanguages[guild.id].toLowerCase();

    return lang.translations[textId][selectedLanguage];
}
module.exports.loadLanguages = loadLanguages;
module.exports.setLanguage = setLanguage;