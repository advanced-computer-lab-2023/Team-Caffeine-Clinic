const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const pharmacistSchema = new Schema({
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
    education: {
        type: String
    },
    ID:{
        type:String
    },
    Degree:{
        type:String
    },
    License:{
        type:String
    }   
});

//pharmacistSchema.plugin(passportLocalMongoose)

pharmacistSchema.statics.signUp = async function(pharmacist) {
    const username = pharmacist.username
    //console.log(username);
    const password = pharmacist.password
    console.log(pharmacist);


    const exists = await this.findOne({ username: username })

    if(exists) {
        throw Error('Username already in use')
    } 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ID:pharmacist.ID,License:pharmacist.License,Degree:pharmacist.Degree,username: pharmacist.username, password: hash, name: pharmacist.name, 
        email: pharmacist.email, speciality: pharmacist.speciality, rate: pharmacist.rate, 
        affiliation: pharmacist.affiliation, education: pharmacist.education})
    
    return user
}

pharmacistSchema.statics.login = async function(username, password) {

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
pharmacistSchema.statics.setPassword  = async function(email, newPassword,res) {
    console.log(newPassword)
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    try{
    const user = await this.findOneAndUpdate({email: email}, {password: hash})

    if(!user){
        throw Error("User Not Found")
    }
        return res.status(202).json({ mssg: "Password Changed Successfully" });
    }
    catch(error){
        return res.status(400).json({error:"User Not Found"})
    }

}


module.exports = mongoose.model('Pharmacist', pharmacistSchema);
