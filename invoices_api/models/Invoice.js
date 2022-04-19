const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema(
    {
        uuid: { type: String, trim: true, unique: true, required: true, immutable: true, default: uuidv4(), index: true },
        ref: { type: String, index: true, trim: true, unique: true, immutable: true, index: true },
        description: { type: String, trim: true },
        paid: { type: Boolean, index: true, default: false },
        pdf: { type: String, trim: true, },
        amount: { type: Number, default: 0 },
        customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
        date: { type: Date, default: Date.now },
        max_payment_date: { type: Date, },//30 days after the end of the month
        payment_date: { type: Date, },
        created: { type: Date, default: Date.now, immutable: true },
        updated: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model("Invoice", schema);