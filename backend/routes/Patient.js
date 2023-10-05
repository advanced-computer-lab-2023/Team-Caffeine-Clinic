const DoctorInfo = require('../Schema/doctorinfoSchema')
const express = require('express');
const router = express.Router();
const Doctor = require('../Schema/doctor'); // Import your Doctor model
const Patient = require('../Schema/Patient'); // Import your Patient model
const Appointment = require('../Schema/appointment'); // Import your Appointment model

// Create a route to select a patient by their ID
router.get('/select-patient/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId; // Get the patient ID from the URL parameter

    // Retrieve the patient details by their ID
    const selectedPatient = await Patient.findById(patientId);

    if (!selectedPatient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    res.json({ patient: selectedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while selecting the patient.' });
  }
});
// Create a route to filter patients by upcoming appointments
router.get('/patients-with-upcoming-appointments', async (req, res) => {
    try {
      const doctorId = req.body; // Assuming you have a user authentication system
      const currentDate = new Date();
  
      // Find upcoming appointments for the doctor
      const upcomingAppointments = await Appointment.find({
        doctor: doctorId,
        appointmentDate: { $gte: currentDate },
      });
  
      // Extract patient IDs from upcoming appointments
      const patientIds = upcomingAppointments.map((appointment) => appointment.patient);
  
      // Find patients based on patient IDs
      const patientsWithUpcomingAppointments = await Patient.find({ _id: { $in: patientIds } });
  
      res.json({ patients: patientsWithUpcomingAppointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while filtering patients with upcoming appointments.' });
    }
  });
  
// Create a route to view patient information and health records
router.get('/view-patient/:patientId', async (req, res) => {
    try {
      const doctorId = req.body; // Assuming you have a user authentication system
      const patientId = req.body;
  
      // Check if the doctor is associated with the patient
      const doctor = await Doctor.findById(doctorId).populate('patients');
      const patient = await Patient.findById(patientId);
  
      if (!doctor.patients.includes(patientId)) {
        return res.status(403).json({ error: 'Access denied. This patient is not registered with you.' });
      }
  
      // If the doctor is associated with the patient, you can access their information and health records
      const patientInfo = {
        username: patient.username,
        name: patient.name,
        email: patient.email,
        // Add other patient information fields you want to include
      };
  
      const healthRecords = patient.health_records;
  
      res.json({ patient: patientInfo, healthRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching patient information.' });
    }
  });

  // Create a route to view a list of all patients for a specific doctor
router.get('/my-patients', async (req, res) => {
    try {
      const doctorId = req.body; // Assuming you have a user authentication system
      const doctor = await Doctor.findById(doctorId).populate('patients');
  
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found.' });
      }
  
      // Extract the list of patients associated with the doctor
      const patients = doctor.patients;
  
      res.json({ patients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the list of patients.' });
    }
  });

// Create a route to search for a patient by name
router.get('/search-patient', async (req, res) => {
  try {
    const doctorId = req.body; // Assuming you have a user authentication system
    const doctor = await Doctor.findById(doctorId); // Retrieve the doctor

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }

    const patientName = req.query.name; // Get the patient name from the query parameter

    // Search for patients by name that are associated with the doctor
    const patients = await Patient.find({
      name: { $regex: new RegExp(patientName, 'i') }, // Case-insensitive search
      _id: { $in: doctor.patients }, // Only search among the doctor's patients
    });

    res.json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for patients.' });
  }
});
  module.exports = router;
