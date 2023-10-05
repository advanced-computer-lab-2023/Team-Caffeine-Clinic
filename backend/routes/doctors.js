const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Get all doctors with optional name and/or speciality filter
router.get('/get', async (req, res) => {
    const name = req.query.name;
    const speciality = req.query.speciality;

    let filter = {};

    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
    if (speciality) filter.speciality = speciality;

    try {
        const doctors = await Doctor.find(filter);
        res.status(200).send(doctors);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get doctor details by ID
router.get('/:doctorId', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        if (!doctor) return res.status(404).send("Doctor not found");
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
