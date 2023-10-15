const express = require('express');
const router = express.Router();

const {
    getDoctors,
    getSingleDoctor,
    getAppointments
} = require('../controllers/doctorController');
const doctor = require('../models/doctor');

// Get all doctors with optional name and/or speciality filter
router.get('/getDoctors', getDoctors);

// Get doctor details by username
router.get('/getSingleDoctor/:username', getSingleDoctor);

router.get('/appointments', getAppointments)

module.exports = router;
