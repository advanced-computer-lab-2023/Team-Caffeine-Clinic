const { default: mongoose } = require('mongoose')

const Prescription = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');


const createPersc = async (req, res) => {
  const user = req.user
  const date = new Date();
  const { appointment, patient, medicine, symptoms, tests, advice } = req.body

  const temp = await Patient.findOne({ username: patient })
  const patient_id = temp._id
  try {
    const perscription = new Prescription({
      appointment: appointment, patientID: patient_id, doctorID: user._id, date_of_perscription: date,
      medicine: medicine, symptoms: symptoms, tests: tests, advice: advice
    })

    await perscription.save()

    res.status(200).json(perscription)
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
}

const getDoctorName = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findOne({ _id: id });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const name = doctor.name;
    //console.log(name);
    res.status(200).json(name);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPerscDetails = async (req, res) => {
  const { appointment } = req.body
  try {
    const persc = await Prescription.findOne({appointment: appointment})
    const medicines = persc.medicine

    res.status(200).json({medicine: medicines})
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  createPersc,
  getDoctorName,
  getPerscDetails
}
