const { default: mongoose } = require('mongoose')

const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');


//Sign up as a new Patient
const signUp = async(req, res) => {
    const {username, name, email, password, dob, gender, mobile_number, Efull_name, Emobile_number, relation} = req.body

    console.log(username, name, email, password, dob, gender, mobile_number, Efull_name, Emobile_number);


    const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation} 

    try{
        const patient = new Patient({username, name, email, password, dob, gender, mobile_number, emergency_contact})

        await patient.save()

        res.status(200).json(patient)
    } catch(error){
        res.status(400).json(error)
    }
}

//View and Filter Perscriptions
const viewFilterPerscriptions = async (req, res) => {
    const patientID = req.query.patientID

    const date = req.query.date;
    const doctor = req.query.doctor;
    const state = req.query.state

    let filter = {};

    if (patientID) filter.patientID = patientID
    if (doctor) filter.doctorID = doctor // Case-insensitive regex search
    if (date) filter.date_of_perscription = date;
    if (state) filter.state = state

    try {
        const prescriptions = await Perscriptions.find(filter);
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getSinglePerscription = async(req, res) => {
    const _id = req.params.perscID

    console.log(_id);

    try {
        const perscription = await Perscriptions.findById(_id)
        res.status(200).json(perscription)
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    signUp,
    viewFilterPerscriptions,
    getSinglePerscription
}