"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.Schema(
    {
        uuid: { type: String, trim: true, unique: true, immutable: true, index: true },
        name: { type: String, trim: true, unique: true, required: true, immutable: true, index: true },
        invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
        created: { type: Date, default: Date.now, immutable: true },
        updated: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model("Customer", schema);