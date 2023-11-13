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
    
    expireAt: { type: Date, default: new Date() }

}, {timestamps: true})

OTPSchema.index( { expireAt: 1 }, { expireAfterSeconds: 60 } )

module.exports = mongoose.model('OTP',OTPSchema);