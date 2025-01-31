const Doctor = require('../models/doctor');
const mongoose = require('mongoose');

const healthPackage = require('../models/healthPackageModel')

const Appointment = require('../models/appointment')

const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');


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
  try {
    const doctorUsername = req.user.username;
    const date = req.query.date;
    const status = req.query.status;
    let filter = { doctor: doctorUsername };

    const appointments = await Appointment.find(filter).populate('doctor');

    const populatedAppointments = await Promise.all(appointments.map(async (appointment) => {
      const doctor = await Doctor.findOne({ username: appointment.doctor });
      const patient = await Patient.findOne({ username: appointment.patient })
      return { ...appointment.toObject(), doctor, patient };
    }));

    let filteredAppointments = populatedAppointments.filter(appointment => {
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


const doctorchangepassword = async (req, res) => {
  const { newPassword } = req.body; // The new password is expected to be sent in the body of the request
  const doctorId = req.user._id; // Get the doctor's ID from the user object in the request

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(404).json({ error: 'Invalid doctor ID' });
  }

  // Regular expression to check for at least one capital letter and one number
  const passwordRequirements = /^(?=.*[A-Z])(?=.*\d)/;

  if (!passwordRequirements.test(newPassword)) {
    return res.status(400).json({ error: 'Password must contain at least one capital letter and one number.' });
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hash = await bcrypt.hash(newPassword, salt); // Hash the new password with the salt

    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Set the new password to the hashed password
    doctor.password = hash;

    // Save the doctor with the new hashed password
    await doctor.save();

    // Respond with a success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  getDoctors,
  getSingleDoctor,
  getAppointments,
  doctorchangepassword
}