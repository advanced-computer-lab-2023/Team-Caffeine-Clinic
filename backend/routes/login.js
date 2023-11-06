const express = require('express')

const passport = require('passport')

const router = express.Router()

//Controllers
const {
    loginPatient,
    loginDoctor,
    loginAdmin,
    login,
    loginPatientfunc,
    loginAdminfunc,
    loginDocfunc,
    logout,
    loginfunc
} = require('../controllers/GuestController')

router.post('/loginAsPatient', loginPatient)

router.post('/loginAsDoctor', loginDoctor, loginDocfunc)

router.post('/loginAsAdmin', loginAdmin, loginAdminfunc)

router.post('/logout', logout)

module.exports = router