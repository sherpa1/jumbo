"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema(
    {
        uuid: { type: String, trim: true, unique: true, required: true, immutable: true },
        user_uuid: { type: String, trim: true, unique: true, required: true, immutable: true },
        password: { type: String, trim: true, required: true },
        disabled: { type: Boolean, default: false },
        created: { type: Date, default: Date.now, immutable: true },
        updated: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model("Credential", schema);