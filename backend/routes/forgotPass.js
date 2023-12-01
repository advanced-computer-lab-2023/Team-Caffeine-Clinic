const express = require('express');
const router = express.Router();

const {
    forgotPass,
    setPass,
    verifyOTP
} = require('../controllers/PatientController')

const {
    forgotPassP,
    setPassP,
    verifyOTPP
} = require('../controllers/PharmacistController')

const {
     setPassA,
     forgotPassA,
     verifyOTPA,
} = require('../controllers/adminController')

router.post('/forgotPass', forgotPass)
router.post('/verifyOTP', verifyOTP)
router.post('/setPassword', setPass)
router.post('/forgotPassP', forgotPassP)
router.post('/verifyOTPP', verifyOTPP)
router.post('/setPasswordP', setPassP)
router.post('/forgotPassA', forgotPassA)
router.post('/verifyOTPA', verifyOTPA)
router.post('/setPasswordA', setPassA)

module.exports = router;
