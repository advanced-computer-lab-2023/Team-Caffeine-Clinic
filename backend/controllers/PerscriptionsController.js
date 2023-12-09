const { default: mongoose } = require('mongoose')

const Prescription = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');


const createPersc = async (req, res) => {
  const user = req.user
  const date = new Date();
  const { appointment, patient, medicine, symptoms, tests, advice, dosage } = req.body
  const patient_id = patient._id
  try {
    let perscription = await Prescription.findOneAndUpdate({ appointment: appointment }, {
      medicine: medicine, symptoms: symptoms, tests: tests, advice: advice, dosage: dosage
    })

    if (!perscription) {
      perscription = new Prescription({
        appointment: appointment, patientID: patient_id, doctorID: user._id, date_of_perscription: date,
        medicine: medicine, symptoms: symptoms, tests: tests, advice: advice, dosage: dosage
      })

      await perscription.save()
    }
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
  const { appointment } = req.query
  try {
    const perscription = await Prescription.findOne({ appointment: appointment })

    res.status(200).json(perscription)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  createPersc,
  getDoctorName,
  getPerscDetails
}
