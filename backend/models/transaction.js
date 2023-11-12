const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generateRandomNumber = () => {
  // Generate a random 30-digit number
  const randomNumber = Math.floor(100000000000000000000000000000 + Math.random() * 900000000000000000000000000000);
  return randomNumber.toString();
};
// Define a schema for the transactions
const transactionSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  healthPackage: {
    type: String,
    default: ""
  },
  appointmentDate: {
    type: String,
    default: ""
  },
  paymentOption: {
    type: String,
    enum: ['healthPackages', 'Appointment'], // Adjust as needed
    required: true,
  },
  doctor: {
    type: String,
    ref: 'doctor',
    default: "",
  },
  patient: {
    type: String,
    ref: 'Patient',
    required: true,
  },
  Refunded: {
    type: Boolean,
    default: false
  },
  comments:{
    type:String ,
    default:""
  }
  ,

  // Timestamps for when the transaction was created and last updated
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


// Create the Mongoose model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
