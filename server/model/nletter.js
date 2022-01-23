const mongoose = require('mongoose');

const nletterSchema = new mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        require: true,
    },
    name: {
        type: String,
        trim: true,
        require: true
    },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    invitation: {
        type: String,
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    classStyle: {
        type: String,
        trim: true,
        require: true
    },
    emails: [String]
},{timestamps: true});

module.exports = mongoose.model("Nletter", nletterSchema);