const mongoose = require('mongoose');

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
    education: {
        type: String
    },
    availableDates: [{
        date: Date,
        time: String
    }],

    patients: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
