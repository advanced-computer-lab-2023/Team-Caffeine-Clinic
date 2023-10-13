const { default: mongoose } = require('mongoose')

const DoctorAppplication = require('../models/DoctorApplication');

const Patient = require('../models/Patient')

const Doctor = require('../models/doctor')

//Apply as a Doctor
const applyDoctor = async(req, res) => {
    const {username, password, email, name, speciality, rate, affiliation, education, availableDates} = req.body

    const doctorApp = new DoctorAppplication({username, password, email, name, speciality, rate, affiliation, education, availableDates})

    await doctorApp.save()

    res.status(200).json(doctorApp)
}

const loginAsPatient = async(req, res) => {
    const {username} = req.body

    try {
        const user = await Patient.findOne({username: username})

        if (user) {
            req.session.user = user;
            console.log(req.session.user._id);
            res.status(200).send('Login successful');
          } else {
            res.status(401).send('Login failed');
          }


    } catch (error) {
        res.status(401).send(error);
    }
}

const loginAsDoctor = async(req, res) => {
    const {username} = req.body

    try {
        const user = await Doctor.findOne({username: username})

        if (user) {
            req.session.user = user;
            console.log(req.session.user._id);
            res.status(200).send('Login successful');
          } else {
            res.status(401).send('Login failed');
          }


    } catch (error) {
        res.status(401).send(error);
    }
}

// const login = async (req, res) => {
//     const { username } = req.body;
  
//     // Try logging in as a patient
//     try {
//       const patient = await Patient.findOne({ username: username });
  
//       if (patient) {
//         req.session.user = patient;
//         console.log(req.session.user._id);
//         res.status(200).send(patient);
//         return; // Exit the function if login succeeds
//       }
//     } catch (error) {
//       res.status(500).send(error);
//       return; // Exit the function on error
//     }
  
//     // If patient login fails, try logging in as a doctor
//     try {
//       const doctor = await Doctor.findOne({ username: username });
  
//       if (doctor) {
//         req.session.user = doctor;
//         console.log(req.session.user._id);
//         res.status(200).send(doctor);
//       } else {
//         res.status(401).send('Login failed');
//       }
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
  

module.exports = {
    applyDoctor,
    loginAsPatient,
    loginAsDoctor
}