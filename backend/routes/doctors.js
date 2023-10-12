const express = require('express');
const router = express.Router();

const {
    getDoctors,
    getSingleDoctor
} = require('../controllers/doctorController');
const doctor = require('../models/doctor');

// Get all doctors with optional name and/or speciality filter
router.get('/getDoctors', getDoctors);

// Get doctor details by ID
router.get('/getSingleDoctor/:doctorId', getSingleDoctor);



module.exports = router;
