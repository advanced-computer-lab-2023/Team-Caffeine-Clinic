const mongoose = require('mongoose');
const HealthPackage = require('../models/healthPackageModel');
const HealthPackages_Transaction = require('../models/HealthPackages_Transaction');
const Patient = require('../models/Patient');
const Transaction = require('../models/transaction');


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
  console.log('na3am');

  const HpTransactionSubscribed = await HealthPackages_Transaction.find({state: 'subscribed'})

  const HpTransactionCancelled = await HealthPackages_Transaction.find({state: 'cancelled'})


  if(!HpTransactionSubscribed && !HpTransactionCancelled){
    return res.status(200).json({error: 'No HP Transaction Found'})
  }

  const currentDate = new Date()

  try {
    for(let i = 0; i < HpTransactionSubscribed.length; i++){
      const HpTransaction = HpTransactionSubscribed[i]
  
      const username = HpTransaction.patient
  
      const transaction = await Transaction.findOne(HpTransaction.transactionId)
  
      const comment = transaction.comments + ' Unsubscribed '
  
      if(HpTransaction.cancel_renewal_time < currentDate){
        await HealthPackages_Transaction.findByIdAndUpdate(HpTransaction._id, {state: 'unsubscribed'})
        await Patient.findOneAndUpdate({username: username}, {health_package: 'Unsubscribed'})
        await Transaction.findOneAndUpdate(HpTransaction.transactionId, {commments: comment})
      }
    }

    for(let i = 0; i < HpTransactionCancelled.length; i++){
      const HpTransaction = HpTransactionCancelled[i]
  
      const username = HpTransaction.patient
  
      const transaction = await Transaction.findOne(HpTransaction.transactionId)
  
      const comment = transaction.comments + ' Unsubscribed '
  
      if(HpTransaction.cancel_renewal_time < currentDate){
        await HealthPackages_Transaction.findByIdAndUpdate(HpTransaction._id, {state: 'unsubscribed'})
        await Patient.findOneAndUpdate({username: username}, {health_package: 'Unsubscribed'})
        await Transaction.findOneAndUpdate(HpTransaction.transactionId, {comments: comment})
      }
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
