const express = require('express');
const router = express.Router();

const {
  getHealthPackages
} = require('../controllers/healthPackesController');


// Get registered HealthPackages
router.get('/', getHealthPackages);


module.exports = router;
