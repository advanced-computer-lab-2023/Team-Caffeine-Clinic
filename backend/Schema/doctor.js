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
        type: String // Add the email field
    },
    education: {
        type: String
    },
    patients: [{
        type: String, // Change the type to String to reference patients by username
        ref: 'Patient' // Reference the Patient model
    }]
});



module.exports = mongoose.model('Doctor', doctorSchema);
