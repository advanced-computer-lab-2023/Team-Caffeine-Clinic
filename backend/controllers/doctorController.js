const Doctor = require('../models/doctor');
const mongoose = require('mongoose');

const healthPackage = require('../models/healthPackageModel')

const Appointment = require('../models/appointment')


// Get all doctors with optional name and/or speciality filter
const getDoctors = async (req, res) => {
  const name = req.query.name;
  const speciality = req.query.speciality;

  let filter = {};

  if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
  if (speciality) filter.speciality = new RegExp(speciality, 'i');

  try {
      const doctors = await Doctor.find(filter);
      res.status(200).send(doctors);
      console.log(doctors);
  } catch (error) {
      res.status(400).send(error);
  }
  
};

// Get doctor details by username
const getSingleDoctor = async (req, res) => {
  const patient = req.user
  const patientHealthPackage = patient.health_package;
  try {
      const doctor = await Doctor.findOne({ username: req.params.username });
   
      if (!doctor) return res.status(404).send("Doctor not found");

      const HealthPackage = await healthPackage.findOne({ name: patientHealthPackage });

      if (!HealthPackage) {
              const doctormap = {
                  username: doctor.username,
                  email: doctor.email,
                  name: doctor.name,
                  speciality: doctor.speciality,
                  affiliation: doctor.affiliation,
                  education: doctor.education,
                  originalRate: doctor.rate,
                  rateAfterDiscount: doctor.rate,
                  availableDates: doctor.availableDates
              }
          return res.status(200).json(doctormap); // Return here
      }
      let rateAfterDiscount = doctor.rate - (doctor.rate * HealthPackage.discounts.doctorSession);
      rateAfterDiscount = rateAfterDiscount + 0.1 * (rateAfterDiscount);

      const doctormap = {
        username: doctor.username,
        email: doctor.email,
        name: doctor.name,
        speciality: doctor.speciality,
        affiliation: doctor.affiliation,
        education: doctor.education,
        originalRate: doctor.rate,
        rateAfterDiscount: rateAfterDiscount,
        availableDates: doctor.availableDates
      }
    return res.status(200).json(doctormap);
  } catch (error) {
      res.status(500).send(error);
  }
};




const getAppointments = async (req, res) => {
  username = req.user.username;
  date = req.query.date;
  appointmentStatus  = req.query.status;
  
   let query = { doctor : username };

   // Check for the optional filters
   if (date && !appointmentStatus ) {
       query.appointmentDate = { $regex: date, $options: 'i' };
   } else if (appointmentStatus  && !date) {
       query.status = appointmentStatus ;
   } else if (date && appointmentStatus ) {
       query = {
           doctor: username,
           appointmentDate: { $regex: date, $options: 'i' },
           status: appointmentStatus ,
       };
   }

   try {
       const appointments = await Appointment.find(query)
       res.status(200).json(appointments);
   } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
   }
};




module.exports = {
  getDoctors,
  getSingleDoctor,
  getAppointments
}