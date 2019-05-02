const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    publicKey: String,
    privateKey: String
});

module.exports = mongoose.model('Cred', credSchema);