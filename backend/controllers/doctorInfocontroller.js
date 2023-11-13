const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Doctor = require('../models/doctor'); // Import your Doctor model
const Patient = require('../models/Patient'); // Import your Patient model
const Appointment = require('../models/appointment');
const { json } = require('body-parser');
const bcrypt = require('bcrypt');

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
        const { dusername, pusername, appointmentDate, status } = req.body;

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
            status: status
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username, // Reference the patient by username
            appointmentDate: new Date(appointmentDate),
            status: status // Convert the appointmentDate to a Date object
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
        password,
        name,
        speciality,
        rate,
        affiliation,
        email, // Add the email field to the request body
        education,
        availableDates,
        patients,
        ID,
        Medical_licenses,
        Medical_degree
    } = req.body;

    const doctor = new Doctor({
        username: username, password: password, name: name, speciality: speciality, rate: rate, affiliation: affiliation,
        email: email, education: education, availableDates: availableDates, patients: patients , ID:ID , Medical_licenses:Medical_licenses,Medical_degree:Medical_degree
    })

    try {
        const user = await Doctor.signUp(doctor)

        res.status(200).json({username, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    // Doctor.register({username: username, 
    //     name: name, speciality: speciality, rate: rate, 
    //     affiliation: affiliation, email: email, education: education, 
    //     availableDates: availableDates, patients: patients}, password, function(err, user) {
    //     if(err){
    //       console.log(err);
    //       return res.status(400).json({err: err})
    //   }
    //       return res.status(200).json({mssg: "Signed Up successfuly"})
    //   })
};
// Define a controller function to get a doctor by ID
const getDoctorByusername = async(req, res) => {
        const doctoruserName = req.user.username; // Assuming you pass the doctor's username as a route parameter

        try {

            // Use Mongoose to find the doctor by username
            const doctor = await Doctor.find({ username: doctoruserName })

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
//update Rate   doneee
const updateRate = async(req, res) => {
    const user = req.user; // Assuming you pass the doctor's username as a query parameter

    const doctorUsername = user.username

    const rate  = req.query.rate; // Change from email to rate

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
//update doctor email   doneeee
const updateEmail = async(req, res) => {
    const user = req.user; // Assuming you pass the doctor's username as a query parameter

    const doctorUsername = user.username // Assuming you pass the doctor's username as a query parameter
    
    const email  = req.query.email; // Change from affiliation to email

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
///update hospital   doneeee
const updateDoctorProfile = async(req, res) => {
    const user = req.user; // Assuming you pass the doctor's username as a query parameter

    const doctorUsername = user.username // Assuming you pass the doctor's username as a query parameter
    
    const  affiliation = req.query.affiliation;

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
            const patientname = req.query.name;
             // Get the patient name from the URL parameter

            // Retrieve the patient details by their name
            const selectedPatient = await Patient.findOne({ username: patientname })

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




 // Create a route to view patient information and health records#req:25
 const getAllHealthRecords = async(req, res) => {
    try {

        const doctor = req.user;

        // Find the doctor by username
       // const doctor = await Doctor.findOne({ username: doctoruserName });

        // if (!doctor) {
        //     return res.status(404).json({ message: 'Doctor not found' });
        // }

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
        return  res.status(200).json( allHealthRecords  );


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching health records.' });
    }
};

const myPatients = async(req, res) => {
    try {
        const user = req.user; // Assuming you pass the doctor's username as a query parameter

        const doctorUsername = user.username // Assuming you pass the doctor's username as a query parameter
        

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
const searchmyPatients = async (req, res) => {
    try {
        const user = req.user; // Assuming you pass the doctor's username as a query parameter

        const doctorUsername = user.username // Assuming you pass the doctor's username as a query parameter
        
        const patientUsername = req.query.patientUsername;

        // Find the doctor by username
        const doctor = await Doctor.findOne({ username: doctorUsername });

        if (!doctor) {
            return res.status(400).json({ message: 'Doctor not found' });
        }

        // Check if the patient is associated with the doctor
        if (!doctor.patients.includes(patientUsername)) {
            return res.status(400).json({ error: 'Patient is not enrolled with this doctor' });
        }

        // You can retrieve patient data from the Patient model here
        // Replace 'PatientModel' with your actual Patient model
        const patient = await Patient.findOne({ username: patientUsername });

        if (!patient) {
            return res.status(400).json({ error: 'Patient not found' });
        }

        // Return patient data
      return  res.status(200).json({ patient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the patient data.' });
    }
};



const doctorchangepassword = async (req, res) => {
  const { newPassword } = req.body; // The new password is expected to be sent in the body of the request
  const doctorId = req.user._id; // Get the doctor's ID from the user object in the request

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(404).json({ error: 'Invalid doctor ID' });
  }

  // Regular expression to check for at least one capital letter and one number
  const passwordRequirements = /^(?=.*[A-Z])(?=.*\d)/;

  if (!passwordRequirements.test(newPassword)) {
    return res.status(400).json({ error: 'Password must contain at least one capital letter and one number.' });
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hash = await bcrypt.hash(newPassword, salt); // Hash the new password with the salt

    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    // Set the new password to the hashed password
    doctor.password = hash;

    // Save the doctor with the new hashed password
    await doctor.save();

    // Respond with a success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const patientsWithUpcomingAppointments = async (req, res) => {
    try {
        const doctorUsername = req.user.username; // Assuming the username is passed as a parameter

        // Get the current date and time
        const currentDate = new Date();

        const allAppointments = await Appointment.find({ doctor: doctorUsername });

        // Filter out appointments with status 'upcoming' or 'followUp'
        const upcomingAndFollowUpAppointments = allAppointments.filter(appointment => {
            return appointment.status === 'upcoming'|| appointment.status === 'FollowUp';
        });

        // Filter out past appointments based on the formatted dates
        const filteredAppointments = upcomingAndFollowUpAppointments.filter(appointment => {
            if (!appointment.appointmentDate) return false; // Check if appointmentDate is undefined

            const parts = appointment.appointmentDate.split("\\");
            if (parts.length !== 5) return false; // Check if the expected format is matched

            const [year, month1, month, time, sec] = parts;
            const [day, hour, min1] = sec.split(":");
            const paddedYear = year[1] + year[2] + year[3] + year[4];
            let min = 0;
            if (min1[1] !== '"') {
                min = min1[0] + min1[1];
            } else {
                min = min1[0];
            }
            const appointmentDate = new Date(paddedYear, month - 1, day, hour, min);

            return appointmentDate >= currentDate;
        });

       

        res.json(filteredAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while listing upcoming appointments.' });
    }
};

const add_available_slots = async (req, res) => {
    const doctorusername = req.user.username; 
    const currentDate = new Date();

    const timeSlot = req.query.timeSlot;
    const [year, month1, month, time,sec] = timeSlot.split("\\");
    const [day, hour, min1] = sec.split(":");
    const paddedYear = year[1]+year[2]+year[3]+year[4];
    let min = 0;
    if(min1[1]!='"'){
     min = min1[0]+min1[1];}
    else {
     min = min1[0];
    }
    const appointmentDate = new Date(paddedYear, month-1, day, hour, min);
    if(appointmentDate<currentDate){
        return res.status(400).json({ message: "This date has already passed Enter a new one " });
    }

    try {
        // Find the doctor by ID
        const doctor = await Doctor.findOne({ username: doctorusername });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Add the new time slot to the available time slots array
        if(!doctor.availableDates.includes(timeSlot)){
        doctor.availableDates.push(timeSlot);
        
        // Save the updated doctor information
        await doctor.save();

        res.status(200).json({ message: "Time slot added successfully", doctor: doctor });}
        else {
            return res.status(400).json({ message: "this available Date is there already " });

        }
    } catch (err) {
        res.status(500).json({ message: "Error adding time slot", error: err.message });
    }
};
const getCompletedAppointmentsForDoctor = async (req, res) => {
    const doctorId = req.user.username; // Assuming you are passing the doctor's ID as a parameter
    try {
      const completedAppointments = await Appointment.find({ doctor: doctorId, status: 'completed' });
      res.status(200).json(completedAppointments);
    } catch (error) {
      console.error('Error fetching completed appointments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const createfollowUPAppointment = async (req, res) => {
    const doctorId = req.user.username;
    const patientId = req.query.patientId;
    const date = req.query.date;

    try {
        // Check if the appointment already exists
        const existingAppointment = await Appointment.findOne({ doctor: doctorId, patient: patientId, appointmentDate: date });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Appointment already exists' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctorId,
            patient: patientId,
            appointmentDate: date,
            status: 'FollowUp', // Assuming the default status is 'upcoming'
        });

        await appointment.save();
        res.status(200).json({ message: 'Appointment created successfully' });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const changeToFollowUp = async (req, res) => {
  const  doctorId = req.user.username;
  const patientId = req.query.patientId;
  const date = req.query.date;


    try {
      const appointment = await Appointment.findOneAndUpdate(
        { doctor: doctorId, patient: patientId, appointmentDate: date },
        { $set: { status: 'FollowUp' } },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.status(200).json({ message: 'Status changed to FollowUp successfully', appointment });
    } catch (error) {
      console.error('Error changing appointment status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getDocumentsForLoggedInDoctorPatients = async (req, res) => {
    try {
      // Assuming the doctor's ID is stored in req.user.id
      const doctorId = req.user.username;
  
      // Find the doctor by ID
      const doctor = await Doctor.findOne({username:doctorId});
  
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      console.log("gbna el doc")
      // Get the list of patient usernames associated with the doctor
      const patientUsernames = doctor.patients;
      if(!patientUsernames){
        return res.status(404).json({ error: 'Doctor has no paitents' });

      }
      console.log("gbna el patients")

  
      // Fetch documents for each patient
      const documentsForPatients = await Promise.all(
        patientUsernames.map(async (patientUsername) => {
          // Find the patient by username
          const patient = await Patient.findOne({ username: patientUsername });
  
          if (!patient) {
            console.warn(`Patient with username ${patientUsername} not found.`);
            return null;
          }
  
          // Fetch documents for the patient
          const documents = patient.Documents;
  
          return {
            patientUsername: patient.username,
            documents,
          };
        })
      );
  
      const result = documentsForPatients.filter((patientDocuments) => patientDocuments !== null);
      
      res.json(result);
    } catch (error) {
      console.error('Error retrieving documents for doctor patients:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports = {
    getAllHealthRecords,
    searchmyPatients,
    patientsWithUpcomingAppointments,
    getDoctorByusername,
    updateDoctorProfile,
    createDoctor,
    updateRate,
    updateEmail,
    createAppointment,
    addPatientToDoctor,
    selectpatient,
    myPatients,
    doctorchangepassword,
    add_available_slots,
    getCompletedAppointmentsForDoctor,
    createfollowUPAppointment,
    changeToFollowUp,
    getDocumentsForLoggedInDoctorPatients
};