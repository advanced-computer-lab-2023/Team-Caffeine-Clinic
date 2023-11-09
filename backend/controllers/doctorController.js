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
  console.log(patient);
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
    try {
        const doctorUsername = req.user.username;
        const date = req.query.date;
        const status = req.query.status;
        let filter = { doctor: doctorUsername };

        const appointments = await Appointment.find(filter);

        let filteredAppointments = appointments.filter(appointment => {
            let isMatched = true;

            if (date) {
                isMatched = isMatched && appointment.appointmentDate.includes(date);
            }

            if (status) {
                isMatched = isMatched && appointment.status === status;
            }

            return isMatched;
        });

        res.json(filteredAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
    }
};



module.exports = {
  getDoctors,
  getSingleDoctor,
  getAppointments
}