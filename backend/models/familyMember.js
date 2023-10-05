const mongoose = require('mongoose');

const Schema = mongoose.Schema

const familyMemberSchema = new Schema({
    patientID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient' 
    },
    name: {
        type: String,
        required: true
    },
    nationalID: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'] 
    },
    relation: {
        type: String,
        required: true,
        enum: ['wife', 'husband', 'child']
    }
}, {timestamps: true});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
