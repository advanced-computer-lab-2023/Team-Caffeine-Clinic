const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new Schema ({
    username:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true
    }

} , {timestamps: true})

//adminSchema.plugin(passportLocalMongoose)

adminSchema.statics.signUp = async function(admin) {
    const username = admin.username
    console.log(username);
    const password = admin.password
    console.log(admin);


    const exists = await this.findOne({ username: username })

    if(exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username: admin.username, password: hash, email: admin.email})

    return user
}

adminSchema.statics.login = async function(username, password) {
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

adminSchema.statics.setPassword = async function(email, newPassword) {
    console.log(newPassword)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const user = await this.findOneAndUpdate({email: email}, {password: hash})
    
    if(!user){
        throw Error('User Not Found')
    }
}

module.exports = mongoose.model('admin',adminSchema);