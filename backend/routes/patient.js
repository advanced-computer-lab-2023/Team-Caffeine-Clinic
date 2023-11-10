const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    filterDoctorsByAvailability, subscribeToHealthPackage, unsubscribeFromHealthPackage, getHealthPackage
} = require('../controllers/PatientController')

const {
    requireAuth,
    requireDoctorAuth
} = require('../middleware/requrieAuth')

router.use(requireAuth)

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)
router.post('/subscribe',subscribeToHealthPackage)
router.post('/unsubscribe',unsubscribeFromHealthPackage)
router.get('/getHealthPackage',getHealthPackage)

module.exports = router