const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema(
    {
        uuid: { type: String, trim: true, unique: true, required: true, immutable: true, default: uuidv4() },
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, required: true },
        email: { type: String, unique: true, index: true, lowercase: true, trim: true, immutable: true, required: true },
        password: { type: String, trim: true, required: true },
        created: { type: Date, default: Date.now, immutable: true },
        updated: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model("User", schema);