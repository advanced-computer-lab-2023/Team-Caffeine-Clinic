const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')

//Models
const DoctorAppplication = require('../models/DoctorApplication');
const Patient = require('../models/Patient')
const Doctor = require('../models/doctor')
const Admin = require('../models/admin')

//const Patient = require('../model/patient'); // Import the Patient model
//const LocalStrategy = require('passport-local').Strategy;

//passport.use('patient-local', new LocalStrategy(Patient.authenticate()));



// Passport local Strategy
passport.use('patient-local', Patient.createStrategy());
passport.use('doctor-local', Doctor.createStrategy());
passport.use('admin-local', Admin.createStrategy());

// To use with sessions
passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());



//const LocalStrategy = require('passport-local').Strategy;




//Apply as a Doctor
const applyDoctor = async(req, res) => {
    const {username, password, email, name, speciality, rate, affiliation, education, availableDates} = req.body

    const doctorApp = new DoctorAppplication({username, password, email, name, speciality, rate, affiliation, education, availableDates})

    await doctorApp.save()

    res.status(200).json(doctorApp)
}

const loginPatient = passport.authenticate('patient-local')
const loginDoctor = passport.authenticate('doctor-local')
const loginAdmin = passport.authenticate('admin-local')

const loginfunc = function(req, res){
    console.log('hima is here');
    // console.log(req.user.username);
    res.status(200).json({mssg: req.session})
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
    req.logout(function(err) {
      if (err) { return next(err); }
    });
  }

module.exports = {
    applyDoctor,
    loginfunc,
    loginAdmin,
    loginPatient,
    loginDoctor,
    logout
}