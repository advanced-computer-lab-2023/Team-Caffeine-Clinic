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
    },
    
    createdAt: { type: Date, expires: 3600 }
})


module.exports = mongoose.model('OTP',OTPSchema);