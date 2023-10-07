const DoctorInfo = require('../Schema/doctorinfoSchema')
const express = require('express');
const router = express.Router();
const Doctor = require('../Schema/doctor'); // Import your Doctor model
const Patient = require('../Schema/Patient'); // Import your Patient model
const Appointment = require('../Schema/appointment'); // Import your Appointment model


// Create a route to view patient information and health records#req:25
router.get('/view-patient/:patientusername', async(req, res) => {
    try {
        const doctorusername = req.body; // Assuming you have a user authentication system
        const patientusername = req.body;

        const doc = await Doctor.findOne({ username: doctorusername });
        // Check if the doctor is associated with the patient
        const doctor = await Doctor.findOne({ username: doctorusername }).populate('patients');
        const patient = await Patient.findOne({ username: patientusername });
        if (!doc || !patient) {
            res.status(400).json({ error: 'Doctor/patient username invalid' });

        }
        if (!doctor.patients.includes(patientusername)) {
            return res.status(403).json({ error: 'Access denied. This patient is not registered with you.' });
        }
        const patinetsDOP = new Date(patient.dob)
        const currentDate = new Date()
        const age = currentDate.getFullYear() - patinetsDOP.getFullYear()
        if (
            currentDate.getMonth() < patinetsDOP.getMonth() ||
            (currentDate.getMonth() == patinetsDOP.getMonth() &&
                currentDate.getDate() < patinetsDOP.getDate())
        ) {
            age--;
        }
        if (age < 0) {
            res.status(400).json({ error: 'this patient has a wrong age entry please re register' });
        }

        // If the doctor is associated with the patient, you can access their information and health records
        const patientInfo = {
            username: patient.username,
            name: patient.name,
            email: patient.email,
            age: age
                // Add other patient information fields you want to include
        };

        const healthRecords = patient.health_records;

        res.json({ patient: patientInfo, healthRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching patient information.' });
    }
});

// Create a route to view a list of all patients for a specific doctor #req: 25,36
router.get('/my-patients', async(req, res) => {
    try {
        const doctorusername = req.body; // Assuming you have a user authentication system
        const doctor = await Doctor.findOne({ username: doctorusername }).populate('patients');

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }

        // Extract the list of patients associated with the doctor
        const patients = doctor.patients;

        if (patients.length == 0) {
            return res.status(400).json({ error: 'Doctor Dont have patients yet' });
        }

        res.json({ patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the list of patients.' });
    }
});


//we dont use this yet
// Create a route to search for a patient by name 
router.get('/search-patient', async(req, res) => {
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