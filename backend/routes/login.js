const express = require('express')

const router = express.Router()

//Controllers
const {
    loginAsPatient,
    loginAsDoctor,
    loginAsAdmin,
    login,
    logout
} = require('../controllers/GuestController')

router.post('/loginAsPatient', login, loginAsPatient)

router.post('/loginAsDoctor', login, loginAsDoctor)

router.post('/loginAsAdmin', login, loginAsAdmin)

router.post('/logout', logout)

module.exports = router