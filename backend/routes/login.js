const express = require('express')

const router = express.Router()

//Controllers
const {
    loginAsPatient,
    loginAsDoctor
} = require('../controllers/GuestController')

router.post('/loginAsPatient', loginAsPatient)

router.post('/loginAsDoctor', loginAsDoctor)

module.exports = router