const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Doctor = require('../models/doctor'); // Import your Doctor model
const Patient = require('../models/Patient'); // Import your Patient model
const Appointment = require('../models/appointment');


//add patients to a doc using the doc username so we can use it whenever we create an appointment 
const addPatientToDoctor = async(req, res) => {
    try {
        const { dusername, pusername } = req.body;

        // Find the doctor by username
        const doctor = await Doctor.findOne({ username: dusername });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Find the patient by username
        const patient = await Patient.findOne({ username: pusername });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Add the patient's username to the doctor's list of patients if it is not there
        if (!doctor.patients.includes(patient.username)) {
            doctor.patients.push(patient.username);
        } else {
            return res.status(404).json({ message: 'Patient is already in your patinets List' });

        }
        await doctor.save();

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
//create a new appointment
//We changed the app schema to ref the username of both the pat and the doc so if we can change it by ID it would be better
const createAppointment = async(req, res) => {
    try {
        const { dusername, pusername, appointmentDate } = req.body;

        // Find the doctor and patient by username
        const doctor = await Doctor.findOne({ username: dusername });
        const patient = await Patient.findOne({ username: pusername });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' });
        }
        // Check if there is an existing appointment with the same details
        const existingAppointment = await Appointment.findOne({
            doctor: doctor.username,
            patient: patient.username,
            appointmentDate: new Date(appointmentDate),
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username, // Reference the patient by username
            appointmentDate: new Date(appointmentDate), // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        const newreq = req
        const newres = res
            // Use the addPatientToDoctor function to add the patient to the doctor's list
        await addPatientToDoctor(newreq, newres);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// // Controller to create a new patient
// const createPatient = async(req, res) => {
//     const {
//         username,
//         name,
//         email,
//         password,
//         dob,
//         gender,
//         mobilenumber,
//         emergencycontact: { full_name, mobile_number, relation_to_the_patient },
//         health_records,
//     } = req.body;

//     try {
//         const patient = new Patient({
//             username,
//             name,
//             email,
//             password,
//             dob,
//             gender,
//             mobilenumber,
//             emergencycontact: {
//                 full_name,
//                 mobile_number,
//                 relation_to_the_patient,
//             },
//             health_records,
//         });
//         const existingpatinet = await Patient.findOne({
//             username,
//             name,
//             email,
//             password,
//             dob,
//             gender,
//             mobilenumber,
//             emergencycontact: {
//                 full_name,
//                 mobile_number,
//                 relation_to_the_patient,
//             },
//             health_records,
//         });
//         if (existingpatinet) {
//             return res.status(400).json({ message: 'patient with the same details already exists' });

//         }
//         await patient.save();
//         res.status(200).json(patient);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
// Create a new doctor
const createDoctor = async(req, res) => {
    const {
        username,
        name,
        speciality,
        rate,
        affiliation,
        education,
        email, // Add the email field to the request body
        availableDates,
        patients,
    } = req.body;

    try {
        const doctor = new Doctor({
            username,
            name,
            speciality,
            rate,
            affiliation,
            education,
            email, // Include the email field in the Doctor creation
            availableDates,
            patients,
        });

        const existingdoctor = await Doctor.findOne({
            username,
            name,
            speciality,
            rate,
            affiliation,
            education,
            email, // Include the email field in the Doctor creation
            availableDates,
            patients,
        });
        if (existingdoctor) {
            return res.status(400).json({ message: 'Doctor with the same details already exists' });
        }
        await doctor.save();
        res.status(201).json(doctor); // Use status 201 for resource creation
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Define a controller function to get a doctor by ID
const getDoctorByusername = async(req, res) => {
        const doctoruserName = req.query.userName; // Assuming you pass the doctor's username as a route parameter
        console.log(doctoruserName);
        try {

            // Use Mongoose to find the doctor by username
            const doctor = await DoctorInfo.find({ username: doctoruserName })

            if (!doctor) {
                // If no doctor with the given username is found, return a 404 Not Found response
                return res.status(404).json({ message: 'Doctor not found' });
            }

            // If the doctor is found, return it in the response
            res.json(doctor);
        } catch (error) {
            // Handle any errors that occur during the database query
            res.status(500).send(error);
        }
    }
    //update Rate
const updateRate = async(req, res) => {
    const doctorUsername = req.query.username; // Assuming you pass the doctor's username as a query parameter
    const { rate } = req.body; // Change from email to rate

    try {
        // Use Mongoose to find the doctor by username
        const doctor = await Doctor.findOneAndUpdate({ username: doctorUsername }, { rate: rate } // Change the field to update to rate
        );

        if (!doctor) {
            // If no doctor with the given username is found, return a 404 Not Found response
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Update the doctor's rate
        doctor.rate = rate; // Change the field to update to rate

        // Save the updated doctor profile
        await doctor.save();

        // Respond with the updated doctor profile
        res.json(doctor);
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
//update doctor email
const updateEmail = async(req, res) => {
    const doctorUsername = req.query.username; // Assuming you pass the doctor's username as a query parameter
    const { email } = req.body; // Change from affiliation to email

    try {
        // Use Mongoose to find the doctor by username
        const doctor = await Doctor.findOneAndUpdate({ username: doctorUsername }, { email: email } // Change the field to update to email
        );

        if (!doctor) {
            // If no doctor with the given username is found, return a 404 Not Found response
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Update the doctor's email
        doctor.email = email; // Change the field to update to email

        // Save the updated doctor profile
        await doctor.save();

        // Respond with the updated doctor profile
        res.json(doctor);
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
///update hospital
const updateDoctorProfile = async(req, res) => {
    const doctorUsername = req.query.username; // Assuming you pass the doctor's username as a query parameter
    console.log(doctorUsername)
    const { affiliation } = req.body;

    try {
        // Use Mongoose to find the doctor by username
        const doctor = await Doctor.findOneAndUpdate({ username: doctorUsername }, { affiliation: affiliation });

        if (!doctor) {
            // If no doctor with the given username is found, return a 404 Not Found response
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Update the doctor's affiliation
        doctor.affiliation = affiliation;

        // Save the updated doctor profile
        await doctor.save();

        // Respond with the updated doctor profile
        res.json(doctor);
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Create a route to select a patient by their name  #req:34
const selectpatient = async(req, res) => {
    try {
        const patientname = req.query.name; // Get the patient name from the URL parameter

        // Retrieve the patient details by their name
        const selectedPatient = await Patient.findOne({ name: patientname })
        console.log(selectedPatient)

        if (!selectedPatient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        res.json({ patient: selectedPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while selecting the patient.' });
    }
}





// Create a route to filter patients by upcoming appointments by doc username #req:35
const patientsWithUpcomingAppointments = async(req, res) => {
    try {
        const { doctoruserName } = req.body; // Assuming you have a user authentication system
        const currentDate = new Date();

        // Find upcoming appointments for the doctor
        const upcomingAppointments = await Appointment.find({
            doctor: doctoruserName,
            appointmentDate: { $gte: currentDate },
        });
        const appointmentData = upcomingAppointments.map((appointment) => ({
            // Assuming you have a patient name field in your Appointment model
            appointmentDate: appointment.appointmentDate,
        }));
        // // Extract patient usernames from upcoming appointments

        const patientusernames = upcomingAppointments.map((appointment) => appointment.patient);

        const patientsWithUpcomingAppointments = await Patient.find({ username: { $in: patientusernames } }).select('name');

        // // Extract the names from the patients
        const patientNames = patientsWithUpcomingAppointments.map((patient) => patient.name);

        res.json({ patientNames, appointmentData });
        // // res.json({ patients: patientsWithUpcomingAppointments.mongoose.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while filtering patients with upcoming appointments.' });
    }
}


// Create a route to view patient information and health records#req:25
const getAllHealthRecords = async (req, res) => {
    try {
        const { doctorUsername } = req.body;
        
        // Find the doctor by username
        const doctor = await Doctor.findOne({ username: doctorUsername });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Determine the patients associated with the doctor, you may have your own logic for this
        // For example, you might have a field in the doctor's model that stores the patient's username
        const patientUsernames = doctor.patients; // Replace with your logic to determine the patient's usernames
        const allHealthRecords = [];

        for (const patientUsername of patientUsernames) {
            const patient = await Patient.findOne({ username: patientUsername });

            if (patient) {
                const healthRecords = patient.health_records;
                allHealthRecords.push({ patientUsername, healthRecords });
            }
        }

        res.json({ allHealthRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching health records.' });
    }
};

const myPatients = async(req, res) => {
    try {
        const { doctorUsername } = req.body;
        
        // Find the doctor by username
        const doctor = await Doctor.findOne({ username: doctorUsername });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Determine the patients associated with the doctor, you may have your own logic for this
        // For example, you might have a field in the doctor's model that stores the patient's username
        const patientUsernames = doctor.patients;

        if (patientUsernames.length == 0) {
            return res.status(400).json({ error: 'Doctor Dont have patients yet' });
        }

        res.json({ patientUsernames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the list of patients.' });
    }
};





module.exports = {
    getAllHealthRecords,
    patientsWithUpcomingAppointments,
    getDoctorByusername,
    updateDoctorProfile,
    createDoctor,
    updateRate,
    updateEmail,
    createPatient,
    createAppointment,
    addPatientToDoctor,
    selectpatient,
    myPatients
};