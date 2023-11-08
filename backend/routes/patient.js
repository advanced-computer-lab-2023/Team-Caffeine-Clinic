const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    filterDoctorsByAvailability,
    linkFamilyMember
} = require('../controllers/PatientController')

const {
    requireAuth,
} = require('../middleware/requrieAuth')

router.use(requireAuth)

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)

router.post('/linkFamilyMember', linkFamilyMember)

module.exports = router