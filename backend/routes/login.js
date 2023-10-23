const express = require('express')

const passport = require('passport')

const router = express.Router()

//Controllers
const {
    loginPatient,
    loginDoctor,
    loginAdmin,
    login,
    loginfunc,
    logout
} = require('../controllers/GuestController')

router.post('/loginAsPatient', loginPatient, loginfunc)

router.post('/loginAsDoctor', loginDoctor, loginfunc)

router.post('/loginAsAdmin', loginAdmin, loginfunc)

router.post('/logout', logout)

module.exports = router