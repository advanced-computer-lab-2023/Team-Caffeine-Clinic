const express = require('express');
const router = express.Router();

const {
    getDoctors,
    getSingleDoctor
} = require('../controllers/doctorController');

// Get all doctors with optional name and/or speciality filter
router.get('/getDoctors', getDoctors);

// Get doctor details by ID
router.get('/getSingleDoctor/:doctorId', getSingleDoctor);

module.exports = router;
