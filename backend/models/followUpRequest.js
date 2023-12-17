const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followUpRequest = new Schema({
  doctor: {
    type: String,
    ref: 'Doctor',
    required: true
  },

  patient: {
    type: String,
    ref: 'Patient',
    required: true
  },

  appointment: {
    type: mongoose.Types.ObjectId,
    ref: 'Appointment',
    required: true
  }
});

module.exports = mongoose.model('followUpRequest', followUpRequest);