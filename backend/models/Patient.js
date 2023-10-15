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
        enum: ['male', 'female'] 
    },

    mobile_number: {
        type: String,
        required: true
    },

    health_package: { 
        type: String, 
        default: 'no package'
    },

    health_records: {
        type: String,
        default: 'insomnia'
    },
    
    emergency_contact: {
        
        full_name:{
            type: String,
           required: true
        },

        mobile_number: {
            type: String,
           required: true
        },

        relation_to_the_patient: {
            type: String,
            required: true,
            enum: ['Wife', 'Husband', 'Child', "Father", "Mother", "Sibling"]
        },
    }

}, {timestamps: true})

module.exports = mongoose.model('Patient', patientSchema)