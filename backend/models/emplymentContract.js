const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employmentContractSchema = new Schema({
  doctor: {
    type: String,
    ref: 'Doctor',
    required: true
  },
  contractDetails: {
    type: String,
    required: true
  },
  markup: {
    type: Number,
    required: true
  },
  clinicProfit: {
    type: Number,
    required: true
  },

  accepted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('EmploymentContract', employmentContractSchema);