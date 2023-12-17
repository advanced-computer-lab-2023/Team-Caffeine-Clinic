const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
        
    },
    name: {
        type: String,
    },
    speciality: {
        type: String,
    },
    rate: {
        type: Number,
    },
    affiliation: {
        type: String,
    },
    education: {
        type: String,
    },
    ID:{
        type:String
    },
    Degree:{
        type:String
    },
    License:{
        type:String
    }
});

module.exports = mongoose.model('PharmacistApplication', applicationSchema);