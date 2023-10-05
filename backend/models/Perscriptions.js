const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prescriptionSchema = new Schema({
    patientID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient',
        required: true
    },

    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },

    date_of_perscription: {
        type: Date,
        required: true
    },

    state: {
        type: String,
        enum: ['filled', 'unfilled'],
        default: "unfilled"
    },

    medicine: [{
        type: String
    }]
}, {timestamps: true})

module.exports = mongoose.model('Perscriptions', prescriptionSchema)