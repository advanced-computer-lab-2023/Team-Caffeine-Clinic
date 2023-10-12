const Doctor = require('../models/doctor');
const mongoose = require('mongoose');


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

// Get doctor details by ID
const getSingleDoctor = async (req, res) => {
  try {
      const doctor = await Doctor.findById(req.params.doctorId);
      if (!doctor) return res.status(404).send("Doctor not found");
      res.status(200).send(doctor);
  } catch (error) {
      res.status(500).send(error);
  }
};


module.exports = {
  getDoctors,
  getSingleDoctor
}