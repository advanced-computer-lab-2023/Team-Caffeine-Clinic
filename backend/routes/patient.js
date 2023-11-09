const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    filterDoctorsByAvailability,createAppointment,addPatientToDoctor,getAppointments,selectpatient, getWallet
} = require('../controllers/PatientController')

const {
    requireAuth,
    requireDoctorAuth
} = require('../middleware/requrieAuth')

router.use(requireAuth)
//add appointment  
router.post('/createAppointment', createAppointment)

//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)
//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)
router.get('/getAppointments',getAppointments)

router.get('/selectpatient',selectpatient)

// Wallet
router.get('/getWallet', getWallet)



module.exports = router