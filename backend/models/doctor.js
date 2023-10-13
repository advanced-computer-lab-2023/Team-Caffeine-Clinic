const mongoose = require('mongoose');

const Schema = mongoose.Schema



const doctorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    education: {
        type: String,
        required: true
    },
    patients: [{
        type: String, 
        ref: 'Patient'
    }]
});

// const Doctor = mongoose.model('Docctor', doctorSchema);


// const drJones = new Doctor({
//     username: "dr_jones",
//     name: "Dr. Samantha Jones",
//     speciality: "Cardiology",
//     rate: 4.8,
//     affiliation: "MediCare Hospital",
//     email: "dr.jones@medicare.com",
//     education: "MD in Cardiology from Harvard Medical School",
//     patients: ["patient1_username", "patient2_username"]
// });

// // Save the doctor to the database
// drJones.save()
// .then(() => {
//     console.log('Doctor added successfully');
// })
// .catch(err => {
//     console.error('Error adding doctor:', err);
// });

module.exports = mongoose.model('Doctor', doctorSchema);
