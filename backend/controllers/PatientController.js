const { default: mongoose } = require('mongoose')

const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');


//Sign up as a new Patient
const signUp = async(req, res) => {
    const {username, name, email, password, dob, gender, mobile_number, Efull_name, Emobile_number, relation} = req.body

    const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation}

    const patient = new Patient({username, name, email, password, dob, gender, mobile_number, emergency_contact})

    await patient.save()

    res.status(200).json(patient)
}


//View and Filter Perscriptions
const viewFilterPerscriptions = async (req, res) => {
    const patientID = req.body

    const date = req.query.date;
    const doctor = req.query.doctor;
    const state = req.query.state

    let filter = {};

    if (patientID) filter.patientID = patientID
    if (doctor) filter.doctor = new RegExp(doctor, 'i'); // Case-insensitive regex search
    if (date) filter.date = date;
    if (state) filter.state = state

    try {
        const prescriptions = await Perscriptions.find(filter);
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    signUp,
    viewFilterPerscriptions
}