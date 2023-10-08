const mongoose = require('mongoose');

const doctorInfoSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
     hospital: { type: String, required: true },
    houryrate: { type: Number, integer: true },
    speciality: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    Mypatients: [{}],
     gender: { type: String, enum: ['Male', 'Female'], required: true },
      contactInfo: {
          email: String,
          phone: String,
          address: String,
      }

}, {timestamps:true})






module.exports = mongoose.model('DoctorInfo',doctorInfoSchema);

 
