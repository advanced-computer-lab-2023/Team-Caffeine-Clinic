const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
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

    email: {
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

//patientSchema.plugin(passportLocalMongoose)

// static signUp 
patientSchema.statics.signUp = async function(patient) {
    const username = patient.username
    //console.log(username);
    const password = patient.password
    console.log(patient);


    const exists = await this.findOne({ username: username })

    if(exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username: patient.username, password: hash, name: patient.name, 
        email: patient.email, dob: patient.dob, gender: patient.gender, 
        mobile_number: patient.mobile_number, health_package: patient.health_package, emergency_contact: patient.emergency_contact})

    return user
}

patientSchema.statics.login = async function(username, password) {
    console.log(username, password);
    if(!username | !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username: username })
    
    if(!user){
        throw Error('Incorrect Username')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('Patient', patientSchema)