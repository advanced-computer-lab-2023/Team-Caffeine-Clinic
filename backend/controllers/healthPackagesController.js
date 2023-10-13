const mongoose = require('mongoose');
const HealthPackage = require('../models/healthPackageModel');


// Get all health packages
const getHealthPackages = async (req, res) => {
  try {
    const healthPackages = await HealthPackage.find();

    console.log(healthPackages);
    res.status(200).send(healthPackages)
    ;
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: 'An error occurred while fetching health packages',
      error: error.message
    });
  }
};

module.exports = {
  getHealthPackages
}
