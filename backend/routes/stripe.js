const express = require('express')

const router = express.Router()

const {pay} = require('../controllers/paymentController')

router.post('/create-payment-intent', pay)

module.exports = router