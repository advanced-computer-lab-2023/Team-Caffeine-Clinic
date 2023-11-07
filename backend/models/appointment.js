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
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
    default :'upcoming'
  }

}, { timestamps: true });


module.exports = mongoose.model('Appointment', appointmentSchema);
