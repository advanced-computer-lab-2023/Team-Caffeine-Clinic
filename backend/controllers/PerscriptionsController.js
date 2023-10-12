const { default: mongoose } = require('mongoose')

const Prescription = require('../models/Perscriptions');
const Doctor = require('../models/doctor');


const createPersc = async(req, res) => {
    const {patient, doctor, date, state, medicine} = req.body

    try{
        const perscription = new Prescription({patientID: patient, doctorID: doctor, date_of_perscription: date, state: state, medicine: medicine})

        await perscription.save()

        res.status(200).json(perscription)
    } catch(error){
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
      res.status(200).json( name );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    createPersc,
    getDoctorName
}
