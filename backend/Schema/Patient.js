const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true,
        // enum: ['male', 'female']
    },

    mobilenumber: {
        type: Number,
        required: true
    },

    emergencycontact: {

        full_name: {
            type: String,
        },

        mobile_number: {
            type: Number,
        },

        relation_to_the_patient: {
            type: String,
        }
    },

    health_records: [{
        type: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Patient', patientSchema)