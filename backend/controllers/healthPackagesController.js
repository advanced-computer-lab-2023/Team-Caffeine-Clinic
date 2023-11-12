const mongoose = require('mongoose');
const HealthPackage = require('../models/healthPackageModel');
const HealthPackages_Transaction = require('../models/HealthPackages_Transaction');
const Patient = require('../models/Patient');


// Get all health packages
const getHealthPackages = async (req, res) => {
  try {
    const healthPackages = await HealthPackage.find();

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

const checkOnHealthPackageTransaction = async (req, res) => {
  const user = req.user
  const hp = user.health_package

  let transaction = await HealthPackages_Transaction.findOne({patient: user.username, healthPackage: hp, state: 'subscribed'})

  if(!transaction){
    transaction = await HealthPackages_Transaction.findOne({patient: user.username, healthPackage: hp, state: 'cancelled'})
    if(!transaction) return res.status(401).json({error: 'No HP Transaction Found'})
  }

  const currentDate = new Date()

  try {
    if(transaction.cancel_renewal_time < currentDate){
      await HealthPackages_Transaction.findByIdAndUpdate(transaction._id, {state: 'unsubscribed'})
      await Patient.findByIdAndUpdate(user._id, {health_package: 'Unsubscribed'})
    }
    return res.status(200).json({mssg: 'Checking on Health Package Done'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error})
  }
}

module.exports = {
  getHealthPackages,
  checkOnHealthPackageTransaction
}
