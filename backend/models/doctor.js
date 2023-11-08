//Doctor

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema



const doctorSchema = new Schema({
    username:{
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
    email: {
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
    patients: [{
        type: String, 
        ref: 'Patient'
    }],
    wallet:{
        type:Number,
        default:0 }
});

//doctorSchema.plugin(passportLocalMongoose)

doctorSchema.statics.signUp = async function(doctor) {
    const username = doctor.username
    //console.log(username);
    const password = doctor.password
    console.log(doctor);


    const exists = await this.findOne({ username: username })

    if(exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username: doctor.username, password: hash, name: doctor.name, 
        email: doctor.email, speciality: doctor.speciality, rate: doctor.rate, 
        affiliation: doctor.affiliation, education: doctor.education, availableDates: doctor.availableDates})

    return user
}

doctorSchema.statics.login = async function(username, password) {
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

module.exports = mongoose.model('Doctor', doctorSchema);
