const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    subscribeToHealthPackage, unsubscribeFromHealthPackage, getHealthPackage,
    linkFamilyMember,
    filterDoctorsByAvailability,
    createAppointment, 
    addPatientToDoctor,
    getAppointments,
    selectpatient, 
    getWallet, 
    payWithWallet,addTransactionAppointment,createAppointmentfam,addTransactionAppointmentfam,refundAppointment
} = require('../controllers/PatientController')

const {
    requireAuth,
} = require('../middleware/requrieAuth')

router.use(requireAuth)
//add appointment  
router.post('/createAppointment', createAppointment)
router.post('/createAppointmentfam', createAppointmentfam)


router.post('/refundAppointment', refundAppointment)


router.post('/addTransactionAppointment', addTransactionAppointment)
router.post('/addTransactionAppointmentfam', addTransactionAppointmentfam)



//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)
//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)
router.post('/subscribe',subscribeToHealthPackage)
router.post('/unsubscribe',unsubscribeFromHealthPackage)
router.get('/getHealthPackage',getHealthPackage)
router.get('/getAppointments',getAppointments)

router.get('/selectpatient',selectpatient)

// Wallet
router.get('/getWallet', getWallet)

// Pay With Wallet
router.post('/payWithWallet', payWithWallet)



router.post('/linkFamilyMember', linkFamilyMember)

module.exports = router