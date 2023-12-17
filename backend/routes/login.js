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
    loginfunc,
    loginPharmacist
} = require('../controllers/GuestController')

router.post('/loginAsPatient', loginPatient)

router.post('/loginAsDoctor', loginDoctor)

router.post('/loginAsAdmin', loginAdmin)

router.post('/logout', logout)

router.post('/loginAsPharmacist', loginPharmacist)


module.exports = router