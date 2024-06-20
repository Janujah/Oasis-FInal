


const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    day: { type: String },
    time: { type: String },
});

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    bio: String,
    registeredId: { type: String, required: true },
    workingHospitals: { type: String, required: true },
    age: { type: Number, required: true },
    contactNo: { type: String, required: true, minlength: 10, maxlength: 10 },
    availability: [availabilitySchema],
    fees: {type:Number, required:true},
    accountNo: {type:String, required:true},
    profileImage: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
