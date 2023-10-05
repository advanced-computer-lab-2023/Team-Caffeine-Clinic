const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  }
  // Add other appointment-related fields as needed
},{timestamps: true});

module.exports = mongoose.model('Appointment', appointmentSchema);
