const express = require('express');
const router = express.Router();

const {
    forgotPass,
    setPass,
    verifyOTP
} = require('../controllers/PatientController')

router.post('/forgotPass', forgotPass)
router.post('/verifyOTP', verifyOTP)
router.post('/setPassword', setPass)

module.exports = router;
