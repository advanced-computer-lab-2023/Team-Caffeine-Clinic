const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new Schema ({
} , {timestamps: true})

adminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('admin',adminSchema);