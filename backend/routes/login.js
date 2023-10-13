const express = require('express')

const router = express.Router()

//Controllers
const {
    loginAsPatient,
    loginAsDoctor,
    loginAsAdmin
} = require('../controllers/GuestController')

router.post('/loginAsPatient', loginAsPatient)

router.post('/loginAsDoctor', loginAsDoctor)

router.post('/loginAsAdmin', loginAsAdmin)

module.exports = router