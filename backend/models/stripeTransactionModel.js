const mongoose = require('mongoose');
const collectionName = "transactions";

const transactionSchema = mongoose.Schema({
    object: { type: String, required: true },
    sessionId: { type: String, required: true },
    payment_intent : { type: String, required: true },
    payment_status: { type: String, required: true },
    amount_total: { type: String, required: true },
    customer_details: { type: Object, required: true},
    transaction_status: { type: String, required: true },
    created_time: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model(collectionName, transactionSchema);

module.exports = Transaction;