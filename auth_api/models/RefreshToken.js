"use strict";

const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        user_uuid: { type: String, trim: true, unique: true, required: true, immutable: true },
        refresh_token: { type: String, trim: true, required: true, immutable: true },
    }
);

module.exports = mongoose.model("RefreshToken", schema);