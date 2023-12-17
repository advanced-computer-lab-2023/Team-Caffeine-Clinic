const express = require('express')

const router = express.Router()

//Controllers
const {
    signUp
} = require('../controllers/PatientController')

const {
    applyDoctor
} = require('../controllers/GuestController')

const {
    applyPharmacist
} = require('../controllers/GuestController')


//Sign up Patient
router.post('/signup', signUp)

//Apply for Doctor
router.post('/applyDoctor', applyDoctor)

//Apply for Pharmacist
router.post('/applyPharmacist', applyPharmacist)

module.exports = router