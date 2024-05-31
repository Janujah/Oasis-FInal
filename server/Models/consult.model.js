
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    preferredDate: {
        type: String,
        required: true
    },
    preferredTime: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    consultationReason: {
        type: String,
        required: true
    },
    preferredLanguage: {
        type: String,
        enum: ['English', 'Spanish', 'Other'],
        required: true
    },
    visitedBefore: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    consent: {
        type: Boolean,
        required: true
    },
    paymentProcessed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
