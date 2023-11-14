const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');
const HealthPackageModel = require('../models/healthPackageModel'); 
const HealthPackagesTransaction  = require('../models/HealthPackages_Transaction'); 

const bcrypt = require('bcrypt');


// Import Models
const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const healthPackage = require('../models/healthPackageModel');
const Appointment = require('../models/appointment')
const OTP = require('../models/OTP');
//const { default: HealthPackages } = require('../../frontend/src/pages/HealthPackages')

const Transaction = require('../models/transaction');
const Admin = require('../models/admin')

// Passport local Strategy
//passport.use(Patient.createStrategy());

// To use with sessions
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());

const addHealthPackageTransactionfam = async (req, res) => {
    try {
     //   const { value, patientId, healthPackageName } = req.params;

     const value = req.query.value;
     const patientId = req.query.patientId;
     const healthPackageName = req.query.healthPackageName;

        // Find the patient
        const patient = await Patient.findOne({username:patientId});
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Find the health package by name
        const HealthPackage = await healthPackage.findOne({ name: healthPackageName });
        if (!HealthPackage) {
            return res.status(404).json({ error: 'HealthPackage not found' });
        }

        // Create a new transaction
        const newTransaction = new Transaction({
            value:value,
            paymentOption: 'healthPackages',
            patient: patientId,
            healthPackage: HealthPackage.name,
        });

        patient.health_package=healthPackageName;

        await patient.save();
        // Save the transaction
        await newTransaction.save();
        const newreq = req;
        const newres = res;

       await createHealthPackagesTransaction(newreq,newres,newTransaction._id,patientId,healthPackageName);

    } catch (error) {
        return res.status(500).json({ error: `Error adding health package transaction: ${error.message}` });
    }
};
const createHealthPackagesTransaction = async (req, res,transactionId,patientUsername,healthPackageId) => {
  
    try {
        // Check if the referenced models exist
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const patient = await Patient.findOne({username: patientUsername});
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const healthPackage = await HealthPackageModel.findOne({name: healthPackageId});
        if (!healthPackage) {
            return res.status(404).json({ error: 'HealthPackageModel not found' });
        }

        // Calculate expiration date (one year from the current date)
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        // Create a new HealthPackagesTransaction instance
        const healthPackagesTransaction = new HealthPackagesTransaction({
            transactionId:transactionId,
            patient: patientUsername,
            healthPackage: healthPackageId,
            state: 'subscribed',
            cancel_renewal_time: expirationDate
        });

        // Save the new document
        await healthPackagesTransaction.save();

        // You can customize the success response as needed
        console.log('Successful isa');
        return res.status(201).json({ message: 'HealthPackagesTransaction created successfully', healthPackagesTransaction });
    } catch (error) {
        // Handle the error and send an appropriate error response
        return res.status(500).json({ error: `Error creating HealthPackagesTransaction: ${error.message}` });
    }
};
const addHealthPackageTransaction = async (req, res) => {
    try {
     //   const { value, patientId, healthPackageName } = req.params;

     const value = req.query.value;
     const patientId = req.user.username;
     const healthPackageName = req.query.healthPackageName;
     console.log('Befire Patient Fetch');

        // Find the patient
        const patient = await Patient.findOne({username:patientId});
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        console.log('After Patient Fetch');
        // Find the health package by name
        const HealthPackage = await healthPackage.findOne({ name: healthPackageName });
        if (!HealthPackage) {
            return res.status(404).json({ error: 'HealthPackage not found' });
        }
        console.log('After Health Package Fetch');

        // Create a new transaction
        const newTransaction = new Transaction({
            value:value,
            paymentOption: 'healthPackages',
            patient: patientId,
            healthPackage: HealthPackage.name,
        });
        console.log('After Transaction Creation');

        patient.health_package=healthPackageName;
        await patient.save();
        // Save the transaction
        await newTransaction.save();
        console.log('After Saving');
        const newreq = req;
        const newres = res;

       await createHealthPackagesTransaction(newreq,newres,newTransaction._id,patientId,healthPackageName);
       console.log('After Function Creation');
    } catch (error) {
        return res.status(500).json({ error: `Error adding health package transaction: ${error.message}` });
    }
};
const markHealthPackageTransactionAsRefunded = async (req, res) => {
    try {
      //  const { patientUsername, healthPackageName } = req.params;
      const patientUsernam = req.user.username;

      const healthPackageName = req.query.healthPackageName;

      const patient = await Patient.findOne({
        username:patientUsernam
      })

      if(!patient){
        return res.status(404).json({ error: 'Patient is  not found' });

      }
        // Find the health package transaction based on patient username and health package name
        const healthPackageTransaction = await HealthPackagesTransaction.findOne({
            patient: patientUsernam,
            healthPackage: healthPackageName,
        });

        if (!healthPackageTransaction) {
            return res.status(404).json({ error: 'Health package transaction not found' });
        }

        // Find the corresponding transaction
        const transaction = await Transaction.findById(healthPackageTransaction.transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const healthPackage = await HealthPackageModel.findone({
            name:healthPackageName
        })

        if(!healthPackage){
            return res.status(404).json({ error: 'Health package  not found' });

        }

        // patient.wallet+=healthPackage.basePrice;
        // Mark the transaction as refunded
        transaction.Refunded = true;

        // Save the updated transaction
        await transaction.save();
        await patient.save();

        return res.status(200).json({ message: 'Transaction marked as refunded', transaction });
    } catch (error) {
        return res.status(500).json({ error: `Error marking transaction as refunded: ${error.message}` });
    }
};



const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}
//Sign up as a new Patient
const signUp = async(req, res) => {
    const {username, password, name, email, dob, gender, mobile_number, health_package, Efull_name, Emobile_number, relation} = req.body
    
    const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation} 
    console.log(password, relation);

    const patient = new Patient({username, password, name, email, dob, gender, 
        mobile_number, health_package, emergency_contact})

    try {
        // Regular expression to check for at least one capital letter and one number

        const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;


        if (!passwordRequirements.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
        }

        let exists = await Doctor.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if(exists) return res.status(400).json({error: 'Username or Email in use'})

        exists = await Admin.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if(exists) return res.status(400).json({error: 'Username or Email in use'})

        const user = await Patient.signUp(patient)

        res.status(200).json({username, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    // const patient = new Patient({username, name, email, dob, gender, mobile_number, health_package, emergency_contact})
    // Patient.register(new Patient({username: username, name, email, dob, gender, mobile_number, health_package, emergency_contact}), password, function(err, user){
    //     //console.log("woah");
    //     if(err){
    //         //console.log("woah");
    //         return res.status(400).json({err: "Error! Try Again"})
    //     }
    //         return res.status(200).json({mssg: "Signed Up successfuly"})
        
    // })
}
const changePass = async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = req.user;

    user.changePassword(oldPassword, newPassword, function(err){
        if(err){
            return res.status(400).json({mssg: "Something went wrong"})
        }
    })
}
function generateOTP() {
    // Generate a random number between 100000 and 999999
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return otp;
  }
const forgotPass = async(req, res) => {
    const {email} = req.body
    console.log(email);
    // Verify Valid Mail
    let user = await Patient.findOne({email: email})
    if(!user){
        user = await Doctor.findOne({email: email})
        
        if(!user){
            user = await Admin.findOne({email: email})
            if(!user){
                return res.status(400).json({err: "Email Address is incorrect"})
            }
        }
    }

    const randomOTP = generateOTP();

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'acluser123@hotmail.com',
          pass: 'AMRgames1@',
        },
    });
      
    const verify = new OTP({
        email: email,
        OTP: randomOTP
    })

    await verify.save()

    const mailOptions = {
        from: 'acluser123@hotmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP: ${randomOTP}`, // Replace with the generated OTP
    };
      
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    return res.status(200).json({mssg: "tmam"})
}
const verifyOTP = async (req, res) => {
    const { otp, email } = req.body;
    console.log(otp, email);
    try {
        const verify = await OTP.findOne({ email: email });

        if (!verify) {
            console.log("No OTP entry found for this email:", email);
            return res.status(404).json({ mssg: "No OTP entry found for this email." });
        }

        console.log("OTP from DB:", verify.OTP, "OTP from user:", otp);

        if (verify.OTP != otp) {
            console.log("Wrong OTP");
            return res.status(400).json({ mssg: "Wrong OTP" });
        }

        console.log("Correct OTP");
    await OTP.deleteOne({_id: verify._id})
        return res.status(200).json({ mssg: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ mssg: "Internal Server Error" });
    }
};
const setPass = async(req, res) => {
    const {newPassword, email} = req.body

    // Regular expression to check for at least one capital letter and one number
    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;


    if (!passwordRequirements.test(newPassword)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
    }

    let user = await Patient.findOne({email: email});

    if(!user){
        user = await Doctor.findOne({email: email})
        
        if(!user){
            user = await Admin.findOne({email: email})
            if(!user){
                return res.status(400).json({err: "Email Address is incorrect"})
            }
            Admin.setPassword(email, newPassword)
            return res.status(202).json({ mssg: "Password Changed Successfully" });
        }
        Doctor.setPassword(email, newPassword)
        return res.status(202).json({ mssg: "Password Changed Successfully" });
    }

    Patient.setPassword(email, newPassword)
    return res.status(202).json({ mssg: "Password Changed Successfully" });

}
//View and Filter Perscriptions
// const viewFilterPerscriptions = async (req, res) => {
//     const user = req.user

//     const patientID = user._id

//     //const patientID = user.username



//     let filter = {};

//     if (patientID) filter.patientID = patientID
//     if (doctor) filter.doctorID = doctor // Case-insensitive regex search
//     if (date) filter.date_of_perscription = date;
//     if (state) filter.state = state

//     try {
//         const prescriptions = await Perscriptions.find(filter);
//         res.status(200).send(prescriptions);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }
const viewFilterPerscriptions = async (req, res) => {
    const user = req.user;
    const patientID = await user._id;
    const date = req.query.date;
    const doctorName = req.query.doctorName; // The input character(s) for doctor name search
    const state = req.query.state;

    let filter = {};
    let prescriptionsarray = [];

    if (patientID) filter.patientID = patientID;
    if (date) filter.date_of_perscription = date;
    if (state) filter.state = state;

    try {
        if (doctorName) {
            // If a doctorName is provided, search for doctors that match the input
            const matchingDoctors = await Doctor.find({
                name: { $regex: new RegExp(doctorName, 'i') }
            }, '_id'); // Only return doctor names
            console.log(matchingDoctors)
            for(let i=0;i<matchingDoctors.length;i++){
               console.log(matchingDoctors[i])
                const filter2  = {}
                if (patientID) filter2.patientID = patientID;
                if (date) filter2.date_of_perscription = date;
                if (state) filter2.state = state;
                if(matchingDoctors[i]) filter2.doctorID = matchingDoctors[i]
                console.log(filter2)
                const prescription = await Perscriptions.findOne(filter2)
                prescriptionsarray.push(prescription)
                
            }
            res.status(200).send( prescriptionsarray );

        } else {
            // If no doctorName is provided, retrieve prescriptions
            const prescriptions = await Perscriptions.find(filter);
            res.status(200).send( prescriptions );
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
const estimateRate = async (req, res) => {

    const patient = req.user
    // const patientId = req.query.patientId;

    try {
        // const patient = await Patient.findById(patientId);
        
        if (!patient) {
            console.log('we ba3deen');
            return res.status(404).json({ error: 'Patient not found' });
        }

        const name = req.query.name;
        const speciality = req.query.speciality;

        let filter = {};

        if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
        if (speciality) filter.speciality = new RegExp(speciality, 'i');

        const doctors = await Doctor.find(filter);
        const patientHealthPackage = patient.health_package;

        const HealthPackage = await healthPackage.findOne({ name: patientHealthPackage });

        if (!HealthPackage) {
            const doctormap = doctors.map(doctor => {
                return{
                    username: doctor.username,
                    email: doctor.email,
                    name: doctor.name,
                    speciality: doctor.speciality,
                    affiliation: doctor.affiliation,
                    education: doctor.education,
                    originalRate: doctor.rate,
                    rateAfterDiscount: doctor.rate
            }});
            return res.status(200).json(doctormap); // Return here
        }

        const doctorRates = doctors.map(doctor => {
            let rateAfterDiscount = doctor.rate - (doctor.rate * HealthPackage.discounts.doctorSession);
            rateAfterDiscount = rateAfterDiscount + 0.1 * (rateAfterDiscount);
            return {
                username: doctor.username,
                email: doctor.email,
                name: doctor.name,
                speciality: doctor.speciality,
                affiliation: doctor.affiliation,
                education: doctor.education,
                originalRate: doctor.rate,
                rateAfterDiscount: rateAfterDiscount,
            };
        });

        return res.status(200).json(doctorRates); // Return here
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
  // Function to filter doctors by availability on a certain date and time
  const filterDoctorsByAvailability = async (req, res) => {
    const  date  = req.query.date;
    
    try {
      const doctors = await Doctor.find({
        availableDates : date
      });
      res.json(doctors);
    } catch (error) {
      console.error('Error filtering doctors by availability:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
const getSinglePerscription = async(req, res) => {
    const _id = req.params.perscID

    console.log(_id);

    try {
        const perscription = await Perscriptions.findById(_id)
        res.status(200).json(perscription)
    } catch (error) {
        res.status(400).send(error);
    }
}



const addPatientToDoctor = async(req, res,dr) => {
    try {
        //const { dusername, pusername } = req.body;

        const dusername= dr;
        const pusername = req.user.username;

        // Find the doctor by username
        const doctor = await Doctor.findOne({ username: dusername });
        console.log()

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Find the patient by username
        const patient = await Patient.findOne({ username: pusername });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        console.log(doctor)
        console.log(patient)


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
const addPatientToDoctorfam = async(req, res,dr,ph) => {
    try {
        //const { dusername, pusername } = req.body;

        const dusername= dr;
        const pusername = ph;

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
const createAppointment = async(req, res) => {
    try {
        const pusername = req.user.username;
        const dusername = req.query.doctorusername;
        const appointmentDate = req.query.date;
        const status = "upcoming";


        // Find the doctor and patient by username
        const doctor = await Doctor.findOne({ username: dusername });
        const patient = await Patient.findOne({ username: pusername });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' }); }

            doctor.availableDates= doctor.availableDates.filter(item => item != appointmentDate);


        // Check if there is an existing appointment with the same details
        const existingAppointment = await Appointment.findOne({
            doctor: doctor.username,
            patient: patient.username,
            appointmentDate: appointmentDate,
            status: status
        });
        
        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }
        const getTransaction = await Transaction.findOne({
            appointmentDate:appointmentDate,
            paymentOption:'Appointment',
            doctor:doctor.username,
            patient:patient.username,
            Refunded:false
        });
        const transactionID = getTransaction._id;

        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username,
            transactionId:transactionID, // Reference the patient by username
            appointmentDate: appointmentDate,
            status: status // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        await doctor.save();
        console.log(appointment);
        const newreq = req
        const newres = res
            // Use the addPatientToDoctor function to add the patient to the doctor's list
        await addPatientToDoctor(newreq, newres,dusername);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const createAppointmentfam = async(req, res) => {
    try {
        const pusername = req.query.patient;
        const dusername = req.query.doctorusername;
        const appointmentDate = req.query.date;
        const status = "upcoming";


        // Find the doctor and patient by username
        const doctor = await Doctor.findOne({ username: dusername });
        const patient = await Patient.findOne({ username: pusername });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' }); }

            doctor.availableDates= doctor.availableDates.filter(item => item != appointmentDate);


        // Check if there is an existing appointment with the same details
        const existingAppointment = await Appointment.findOne({
            doctor: doctor.username,
            patient: patient.username,
            appointmentDate: appointmentDate,
            status: status
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }

        const getTransaction = await Transaction.findOne({
            //appointmentDate:appointmentDate,
            paymentOption:'Appointment',
            doctor:doctor.username,
            patient:patient.username
        });

        const transactionID = getTransaction._id;
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username,
            transactionId:transactionID,// Reference the patient by username
            appointmentDate: appointmentDate,
            status: status // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        await doctor.save();
        const newreq = req
        const newres = res
            // Use the addPatientToDoctor function to add the patient to the doctor's list
        await addPatientToDoctorfam(newreq, newres,dusername,pusername);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getAppointments = async (req, res) => {
    try {
        const patientUsername = req.user.username;
        const date = req.query.date;
        const status = req.query.status;

        let filter = { patient: patientUsername };

        const appointments = await Appointment.find(filter);

        const filteredAppointments = await Promise.all(appointments.map(async appointment => {
            let isMatched = true;

            if (date) {
                isMatched = isMatched && appointment.appointmentDate.includes(date);
            }

            if (status) {
                isMatched = isMatched && appointment.status === status;
            }

            // Check if the appointment has a transaction and the transaction is not refunded
            if (appointment.transactionId) {
                const transaction = await Transaction.findById(appointment.transactionId);
                isMatched = isMatched && transaction && !transaction.Refunded;
            }

            return isMatched ? appointment : null;
        }));

        // Remove null values from the array (appointments without matching transactions)
        const finalAppointments = filteredAppointments.filter(appointment => appointment !== null);

        res.json(finalAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
    }
};
const refundAppointment = async (req, res) => {
    try {
        const appointmentdate = req.query.appointmentdate;
        const doc = req.query.doc;
        const patient = req.user.username;
        const transactionID = req.query.transactionID;
        console.log(appointmentdate);

        // Find the appointment by ID
        const appointment = await Appointment.findOne({
            doctor:doc,
            patient:patient,
            appointmentDate:appointmentdate,
        });
        console.log(appointment);

        const patient1 = await Patient.findOne({username:patient});
        const doctor1 = await Doctor.findOne({username:doc});

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        // Check if the appointment has a transaction
        if (!appointment.transactionId) {
            return res.status(400).json({ error: 'Appointment does not have a transaction.' });
        }

        // Find the transaction by ID
        const transaction = await Transaction.findById(appointment.transactionId);

        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found.' });
        }

        // Check if the transaction has already been refunded
        if (transaction.Refunded) {
            return res.status(400).json({ error: 'Transaction has already been refunded.' });
        }

        // Perform the refund by updating the transaction
        transaction.Refunded = true;
          patient1.wallet+=transaction.value;
          doctor1.wallet-=transaction.value;
          await doctor1.save();
          await patient1.save();
        await transaction.save();

        // Optionally, you can update the appointment status or perform any other necessary actions

        res.json({ message: 'Appointment refunded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the refund.' });
    }
};



const selectpatient = async(req, res) => {
    try {
        const patientname = req.user.username;
         // Get the patient name from the URL parameter

        // Retrieve the patient details by their name
        const selectedPatient = await Patient.findOne({ username: patientname })

        if (!selectedPatient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        return res.status(200).json({ patient: selectedPatient });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while selecting the patient.' });
    }
}
const getWallet = async(req, res) => {
    try {
        const user = req.user

        res.status(200).json({wallet: user.wallet})

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while selecting the patient.' });
    }
}
const payWithWallet = async (req, res) => {
    const user = req.user
    
    const {amount, doctorUsername} = req.query

    const newPatientWallet = user.wallet - parseInt(amount, 10)

    try {
        const doctor = await Doctor.findOne({username: doctorUsername})

        if(!doctor){
            return res.status(400).json({error: 'Doctor Not Found'})
        }

        const newDoctorWallet = doctor.wallet + parseInt(amount, 10)

        await Doctor.findByIdAndUpdate(doctor._id, {wallet: newDoctorWallet})
        
        await Patient.findByIdAndUpdate(user._id, {wallet: newPatientWallet})

        return res.status(200).json({mssg: 'Successful'})
    } catch (error) {
        return res.status(400).json({error: error})
    }
}
const linkFamilyMember = async(req, res) => {
    const user = req.user
    const filter = req.query.EmailorPhhone
    const relation = req.query.relation
    // const {filter, relation} = req.body // filter is either email or phone number
    let patient;
    try {
        
        if(filter.includes("@")){
            patient = await Patient.findOne({email: filter})
        } else{
            patient = await Patient.findOne({mobile_number: filter})
        }    

        if(!patient){
            return res.status(400).json({mssg: "Patient not Found"})
        }
        
        updateFamilyMember(user, patient, relation)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error})
    }
    
}
async function updateFamilyMember(user, patient, relation) {
    await Patient.findOneAndUpdate(
        { _id: user._id }, 
        { $push: {  
            
                family_members: patient._id,
                relation: relation
                } 
        })

    let reverseRelation;

    switch(relation){
        case "Wife":
            reverseRelation = "Husband"
            break
        case "Husband": 
            reverseRelation = "Wife"
            break
        case "Sibling":
            reverseRelation = "Sibling"
            break
        case "Father":
        case "Mother":
            if(user.gender === "male")
                reverseRelation = "Son"
            else
                reverseRelation = "Daughter"
    }

    await Patient.findOneAndUpdate(
        { _id: patient._id }, 
        { $push: { 
                family_members: user._id,
                relation: reverseRelation
                } 
        })
}
const subscribeToHealthPackage = async (req, res) => { 
    try {

        const patient = req.user;

        const { healthPackageName } = req.body;
        console.log(healthPackageName);

        const HealthPackage = await healthPackage.findOne({ name: healthPackageName });

        if (!HealthPackage) {
            return res.status(404).json({ error: 'Patient or HealthPackage not found' });
        }

        if (patient.health_package == HealthPackage.name) {
            return res.status(200).json({ error: 'You are already subscribed to this health package'});
        } 

        const updatedPatient = await Patient.findOneAndUpdate(
            { _id: patient._id },
            { health_package: HealthPackage.name },
            { new: true } 
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient or HealthPackage not found' });
        }
        
        res.json({ message: 'Subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

const unsubscribeFromHealthPackage = async (req, res) => { 
    try {
       const patient = req.user;

       const {familyMemberUsername} = req.query

       let username

       if(familyMemberUsername){
        username = familyMemberUsername
       } else {
            username = patient.username
            
            if (patient.health_package == 'Unsubscribed') {
                return res.status(404).json({ error: 'You are not subscribed to any package' });
            }
       }


       const HpTransaction = await HealthPackagesTransaction.findOneAndUpdate({patient: username, state: 'subscribed'}, 
       {state: 'cancelled'})

        if (!HpTransaction) {
            return res.status(404).json({ error: 'HealthPackage Transaction not found' });
        }

        const transaction = await Transaction.findOne(HpTransaction.transactionId)

        const comment = transaction.comments + ' Cancelled '

        console.log(comment);

        await Transaction.findOneAndUpdate(HpTransaction.transactionId, {comments: comment})

        return res.status(200).json({ message: 'Cancellation successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

const getHealthPackage = async (req, res) => { 

    const patient = req.user
    let transaction = await HealthPackagesTransaction.findOne({patient: patient.username, state: 'subscribed'})

    if(!transaction){
        transaction = await HealthPackagesTransaction.findOne({patient: patient.username, state: 'cancelled'})
        if(!transaction) return res.status(400).json({error: 'No Package Transaction Found'})
    }

    const HealthPackageName = patient.health_package;
    console.log(HealthPackageName);
    const HealthPackage = await healthPackage.findOne({ name: HealthPackageName }).exec();

    if (!HealthPackage) {
        return res.status(400).json({error: 'No Package Found'})
    }

    res.status(200).json({transaction: transaction, healthPackage: HealthPackage});

    // try {
    //    // console.log(_id);
    //         const HealthPackageName = patient.health_package;
    //         console.log(HealthPackageName);

    //         const HealthPackage = await healthPackage.findOne({ name: HealthPackageName }).exec();

    //         // if (HealthPackage.name == "no Package"){
    //         //     return res.status(404).json({ error:'error '});
    //         // }
           
    //      res.status(200).json(HealthPackage);
    //      console.log(HealthPackage);
    //     }
    //      catch (error) {
    //         console.log(error);
    //         res.status(400).send(error);
    //     }
    }
 const addTransactionAppointmentfam = async (req, res) => {
        try {
          // Get data from req.query
        //  const { doctorUsername, patientUsername, appointmentDate, transactionValue } = req.query;
            const doctorUsername = req.query.doctorUsername;
            const patientUsername = req.query.patient;
            const appointmentDate = req.query.appointmentDate;
            const transactionValue = req.query.transactionValue;
      
          // Set payment option to 'Appointment'
          const paymentOption = 'Appointment';
      
          // Check if the doctor and patient exist (you may want to handle this more robustly in a real-world scenario)
          // Assuming you have 'Doctor' and 'Patient' models
          const doctorExists = await Doctor.exists({ username: doctorUsername });
          const patientExists = await Patient.exists({ username: patientUsername });

          
      
          if (!doctorExists || !patientExists) {
            return res.status(404).json({ error: 'Doctor or patient not found.' });
          }

          // Create a new transaction
          const newTransaction = new Transaction({
            value: transactionValue,
            appointmentDate:appointmentDate,
            paymentOption:"Appointment",
            doctor: doctorUsername,
            patient: patientUsername,
          });
      
          // Save the transaction to the database
          await newTransaction.save();
      
          res.status(201).json({ message: 'Appointment transaction added successfully.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
const addTransactionAppointment = async (req, res) => {
        try {
          // Get data from req.query
        //  const { doctorUsername, patientUsername, appointmentDate, transactionValue } = req.query;
            const doctorUsername = req.query.doctorUsername;
            const patientUsername = req.user.username;
            const appointmentDate = req.query.appointmentDate;
            const transactionValue = req.query.transactionValue;
            console.log(transactionValue+"herereee")
      
          // Set payment option to 'Appointment'
          const paymentOption = 'Appointment';
      
          // Check if the doctor and patient exist (you may want to handle this more robustly in a real-world scenario)
          // Assuming you have 'Doctor' and 'Patient' models
          const doctorExists = await Doctor.exists({ username: doctorUsername });
          const patientExists = await Patient.exists({ username: patientUsername });
      
          if (!doctorExists || !patientExists) {
            return res.status(404).json({ error: 'Doctor or patient not found.' });
          }

          // Create a new transaction
          const newTransaction = new Transaction({
            value: transactionValue,
            appointmentDate:appointmentDate,
            paymentOption:"Appointment",
            doctor: doctorUsername,
            patient: patientUsername,
          });
      
          // Save the transaction to the database
          await newTransaction.save();
      
          res.status(201).json({ message: 'Appointment transaction added successfully.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };



const patientchangepassword = async (req, res) => {
    const { newPassword } = req.body;
    const patientId = req.user._id;
  
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(404).json({ error: 'Invalid patient ID' });
    }
  
    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

    if (!passwordRequirements.test(newPassword)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
    }

  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
  
      const patient = await Patient.findById(patientId);
      
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      patient.password = hash;
      await patient.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getFamilyMembersHealthPackages = async (req ,res) => {
    
    const patient = req.user
      
        

    if (!patient) {
        throw new Error('Patient not found');
    }
    const familyMembersHealthPackages = [];
    for(let i = 0; i < (patient.family_members).length; i++){
        const member = patient.family_members[i]
        const transaction = await HealthPackagesTransaction.findOne({patient: member.username, state: { $in: ['subscribed', 'cancelled'] }})
        
        if(!transaction){
            const input = {username: member.username, name: member.name, state: 'unsubscribed', healthPackage: 'None'}
            familyMembersHealthPackages[i] = input
        }
        else{
            const state = transaction.state
            familyMembersHealthPackages[i] = {username: member.username, name: member.name, state: state, ...transaction};
        }
    }
    try {
    
        // const familyMembersHealthPackages = patient.family_members.map(member => ({
        //     username: member.username,
        //     name: member.name,
        //     health_package: member.health_package,
        // }));

        return res.status(200).json({familyMembersHealthPackages});

    } catch (error) {
        return res.status(500).json({error});
    }
};



const saveDocuments =   async (req, res) => {
    const  username  = req.user.username;
    const {documents,descriptions} = req.body;
 
   

    if (!Array.isArray(documents) || !Array.isArray(descriptions)) {
        return res.status(400).json({ message: 'Invalid format for documents or descriptions' });
    }

    try {
        // Find the patient by username

        console.log("ana hena tani ")

        const patient = await Patient.findOne({ username: username });
        console.log("ana hena tani2 ")

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        console.log(documents.length+"   "+ descriptions.length)

        if (documents.length !== descriptions.length) {
            return res.status(400).json({ message: 'Descriptions and documents arrays must have the same length' });
        }
        console.log("ana hena 4")
       
        // Map through the arrays and push documents with descriptions to the patient's Documents array
        descriptions.forEach((description, index) => {
            patient.Documents.push({
                description:description,
                content: documents[index],
            });
        });
        console.log("ana hena tani ")

        // Save the updated patient to the database
        await patient.save();

        return res.status(200).json({ message: 'Documents saved successfully', patient });
    } catch (error) {
        console.error('Error saving documents:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const viewMyDocuments = async (req, res) => {
    try {
      const username = req.user.username; // Get the username from the authenticated user
      const patient = await Patient.findOne({ username:username }); // Fetch only the username and Documents fields
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.status(200).json({
        username: patient.username,
        documents: patient.Documents,
      });
    } catch (error) {
      console.error('Error viewing patient documents:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const deleteDocument = async (req, res) => {
    try {
      //const { patientId, description } = req.body;
      const patientId = req.user.username;
      const description = req.query.description;
  
      // Find the patient by ID
      const patient = await Patient.findOne({username:patientId});
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Find the index of the document with the given description
      const documentIndex = patient.Documents.findIndex(
        (document) => document.description === description
      );
  
      if (documentIndex === -1) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Remove the document from the array
      patient.Documents.splice(documentIndex, 1);
  
      // Save the updated patient to the database
      await patient.save();
  
      return res.status(200).json({ message: 'Document deleted successfully', patient });
    } catch (error) {
      console.error('Error deleting document:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    getFamilyMembersHealthPackages,
    signUp,
    viewFilterPerscriptions,
    getSinglePerscription,
    estimateRate,
    getAppointments,
    filterDoctorsByAvailability,
    changePass,
    setPass,
    forgotPass,
    verifyOTP,
    patientchangepassword,
    subscribeToHealthPackage,
    unsubscribeFromHealthPackage,
    getHealthPackage,
    linkFamilyMember,
    createAppointment,
    addPatientToDoctor,
    selectpatient,
    getWallet,
    payWithWallet,addTransactionAppointment,createAppointmentfam,addTransactionAppointmentfam,
    refundAppointment,createHealthPackagesTransaction,addHealthPackageTransaction,
    markHealthPackageTransactionAsRefunded,addHealthPackageTransactionfam,saveDocuments,viewMyDocuments,deleteDocument
}