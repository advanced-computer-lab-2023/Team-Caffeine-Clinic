const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: {
    type: String, 
    ref: 'doctor', 
    required: true,
  },
  patient: {
    type: String, 
    ref: 'Patient', 
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  }

}, { timestamps: true });


module.exports = mongoose.model('Appointment', appointmentSchema);
