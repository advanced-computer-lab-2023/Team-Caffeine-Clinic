const express = require('express');
const router = express.Router();

const { 
    getAppointments
 } = require('../controllers/PatientController')
 const requireAuth = require('../middleware/requrieAuth')

router.use(requireAuth)

router.get('/appointments', getAppointments)

module.exports = router;