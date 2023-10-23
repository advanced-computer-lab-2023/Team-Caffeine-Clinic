//Doctor

const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema



const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    education: {
        type: String,
        required: true
    }, 
    availableDates: [{
        type:String,
        required: true,
        default:[]
    }],
    patients: [{
        type: String, 
        ref: 'Patient'
    }]
});

doctorSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Doctor', doctorSchema);
