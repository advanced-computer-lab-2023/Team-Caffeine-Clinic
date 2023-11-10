const express = require('express')

const router = express.Router()

const {pay, updateDoctorWallet} = require('../controllers/paymentController')

router.post('/create-payment-intent', pay)

router.post('/updateDoctorWallet', updateDoctorWallet)

module.exports = router