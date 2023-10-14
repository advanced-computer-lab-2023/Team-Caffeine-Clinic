const express = require('express');
const router = express.Router();

const {
  getHealthPackages
} = require('../controllers/healthPackagesController');

const { estimateRate } = require('../controllers/PatientController');

// Get registered HealthPackages
router.get('/', getHealthPackages);
router.get('/estimateRate', estimateRate);


module.exports = router;
