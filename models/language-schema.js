const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const languageSchema = mongoose.Schema({
    _id: reqString, // guild id
    language: reqString
});

module.exports = mongoose.model('languages', languageSchema);