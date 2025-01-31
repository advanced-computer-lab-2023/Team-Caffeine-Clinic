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
        type: String,
        required:true
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
       type:String,
       required: true,
       default:[]
       
    }],
    ID:{
        type:String
    },
    Medical_licenses :{
        type:String
    },
    Medical_degree:{
        type:String
    }
});

module.exports = mongoose.model('DoctorApplication', applicationSchema);