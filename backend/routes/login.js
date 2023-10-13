const express = require('express')

const router = express.Router()

//Controllers
const {
    loginAsPatient
} = require('../controllers/GuestController')

router.post('/login', loginAsPatient)

module.exports = router