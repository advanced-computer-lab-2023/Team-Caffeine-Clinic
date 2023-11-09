const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    filterDoctorsByAvailability, subscribeToHealthPackage
} = require('../controllers/PatientController')

const {
    requireAuth,
    requireDoctorAuth
} = require('../middleware/requrieAuth')

router.use(requireAuth)

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)
router.post('/subscribe',subscribeToHealthPackage)

module.exports = router