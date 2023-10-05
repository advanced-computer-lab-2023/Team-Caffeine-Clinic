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
    education: {
        type: String,
        required: true
    },
    availableDates: [{
        date: Date,
        time: String
    }]
});

module.exports = mongoose.model('DoctorApplication', applicationSchema);