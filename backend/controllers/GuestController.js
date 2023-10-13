const { default: mongoose } = require('mongoose')

const DoctorAppplication = require('../models/DoctorApplication');

//Apply as a Doctor
const applyDoctor = async(req, res) => {
    const {username, password,email, name, speciality, rate, affiliation, education, availableDates} = req.body

    const doctorApp = new DoctorAppplication({username, password,email, name, speciality, rate, affiliation, education, availableDates})

    await doctorApp.save()

    res.status(200).json(doctorApp)
}

module.exports = {
    applyDoctor
}