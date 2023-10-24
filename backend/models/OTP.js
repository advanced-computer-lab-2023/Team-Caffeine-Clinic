const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPSchema = new Schema ({
    email: {
        type: String,
        required: true
    },

    OTP: {
        type: String,
        required: true
    }
} , {timestamps: true})


module.exports = mongoose.model('OTP',OTPSchema);