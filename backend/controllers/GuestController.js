const { default: mongoose } = require('mongoose')

const DoctorAppplication = require('../models/DoctorApplication');

const Patient = require('../models/Patient')

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

module.exports = {
    applyDoctor,
    loginAsPatient
}