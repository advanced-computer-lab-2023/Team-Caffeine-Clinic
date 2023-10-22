const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new Schema ({
    Username: {
        type: String,
        required: true, 
        unique: true
    },
    Password: {
        type: String,
        required: true
    } 
} , {timestamps: true})

adminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('admin',adminSchema);