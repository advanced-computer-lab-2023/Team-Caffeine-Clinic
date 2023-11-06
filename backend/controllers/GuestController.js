const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')

const jwt = require('jsonwebtoken')

//Models
const DoctorAppplication = require('../models/DoctorApplication');
const Patient = require('../models/Patient')
const Doctor = require('../models/doctor')
const Admin = require('../models/admin')

//const Patient = require('../model/patient'); // Import the Patient model
//const LocalStrategy = require('passport-local').Strategy;

//passport.use('patient-local', new LocalStrategy(Patient.authenticate()));



// Passport local Strategy
// passport.use('patient-local', Patient.createStrategy());
//passport.use('doctor-local', Doctor.createStrategy());
passport.use('admin-local', Admin.createStrategy());

// To use with sessions
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());
// passport.serializeUser(Doctor.serializeUser());
// passport.deserializeUser(Doctor.deserializeUser());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());



//const LocalStrategy = require('passport-local').Strategy;


const createToken = (_id, type) => {
  return jwt.sign({_id: _id, type: type}, process.env.SECRET, {expiresIn: '3d'})
}



//Apply as a Doctor
const applyDoctor = async(req, res) => {
    const {username, password, email, name, speciality, rate, affiliation, education, availableDates} = req.body

    const doctorApp = new DoctorAppplication({username, password, email, name, speciality, rate, affiliation, education, availableDates})

    await doctorApp.save()

    res.status(200).json(doctorApp)
}

// const loginPatient = passport.authenticate('patient-local')
//const loginDoctor = passport.authenticate('doctor-local')
const loginAdmin = passport.authenticate('admin-local')

const loginPatient = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Patient.login(username, password)

    //create token
    const token = createToken(user._id, 'Patient')

    res.status(200).json({type: 'Patient', token})
  } catch (error) {
    res.status(400).json({error: error}) 
  }
}

const loginDoctor = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Doctor.login(username, password)

    //create token
    const token = createToken(user._id, 'Doctor')

    res.status(200).json({type: 'Doctor', token})
  } catch (error) {
    res.status(400).json({error: error}) 
  }
}

const  loginfunc = function(req, res){
  //req.login()
  console.log(req.user);
}

const loginPatientfunc = function(req, res){
    console.log('hima is here');
    console.log(req.user);
    const token = createToken(req.user._id, "Patient")
    // console.log(req.user.username);
    res.status(200).json({type: 'Patient', token: token, mssg: req.session})
}

const loginDocfunc = function(req, res){
    console.log('hima is here');
    const token = createToken(req.user._id, "Doctor")
    // console.log(req.user.username);
    res.status(200).json({type: 'Doctor', token: token})
}

const loginAdminfunc = function(req, res){
    console.log('hima is here');
    const token = createToken(req.user._id, "Admin")
    // console.log(req.user.username);
    res.status(200).json({type: 'Admin', token: token})
}

// const loginAsPatient = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Patient.findOne({username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

// const loginAsDoctor = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Doctor.findOne({username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

// const loginAsAdmin = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Admin.findOne({Username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

const logout = function(req, res, next) {
  console.log(req.user);
    req.logout(function(err) {
      if (err) { 
        console.log(err);
        return next(err); }
    });
  }

module.exports = {
    applyDoctor,
    loginPatientfunc,
    loginAdminfunc,
    loginDocfunc,
    loginAdmin,
    loginPatient,
    loginDoctor,
    loginfunc,
    logout
}