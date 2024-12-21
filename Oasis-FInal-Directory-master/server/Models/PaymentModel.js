
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    chargeId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    receiptEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    shipping: {
        name: {
            type: String,
            // required: true
        },
        address: {
            country: {
                type: String,
                // required: true
            }
        }
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
