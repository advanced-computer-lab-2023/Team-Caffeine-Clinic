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
  transactionId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'transaction'
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'completed', 'cancelled', 'rescheduled','FollowUp'],
    default :'upcoming'
  }

}, { timestamps: true });


module.exports = mongoose.model('Appointment', appointmentSchema);
