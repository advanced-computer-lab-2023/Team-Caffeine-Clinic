const mongoose = require('mongoose');

const Schema = mongoose.Schema

const doctorSchema = new Schema({
    username: {
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
    email: {
        type: String, // Add the email field
        required: true, // You can change this to `false` if email is not always required
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
