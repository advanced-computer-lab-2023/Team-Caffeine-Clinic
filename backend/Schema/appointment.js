const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: {
    type: String, // Change the type to String
    ref: 'Doctor', // Reference the model name
    required: true,
  },
  patient: {
    type: String, // Change the type to String
    ref: 'Patient', // Reference the model name
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  }
  // Add other appointment-related fields as needed
}, { timestamps: true });


module.exports = mongoose.model('Appointment', appointmentSchema);
