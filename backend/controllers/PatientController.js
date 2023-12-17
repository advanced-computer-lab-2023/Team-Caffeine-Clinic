const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const HealthPackage = require('../models/healthPackageModel');
const HealthPackagesTransaction = require('../models/HealthPackages_Transaction');
const Medicine = require('../models/Medicine.js');


const Notification = require('../models/Notification.js')

const bcrypt = require('bcrypt');
// Import Models
const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment')
const OTP = require('../models/OTP');
const Notification = require('../models/Notification.js')
const Transaction = require('../models/transaction');
const Admin = require('../models/admin');
const Pharmacist = require('../models/Pharmacist.js');
const Orders = require('../models/Orders.js')

const FollowUpRequest = require('../models/followUpRequest')


const addHealthPackageTransactionfam = async (req, res) => {
    try {
        //   const { value, patientId, healthPackageName } = req.params;

        const value = req.query.value;
        const patientId = req.query.patientId;
        const healthPackageName = req.query.healthPackageName;

        // Find the patient
        const patient = await Patient.findOne({ username: patientId });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Find the health package by name
        const HealthPackage = await HealthPackage.findOne({ name: healthPackageName });
        if (!HealthPackage) {
            return res.status(404).json({ error: 'HealthPackage not found' });
        }

        // Create a new transaction
        const newTransaction = new Transaction({
            value: value,
            paymentOption: 'healthPackages',
            patient: patientId,
            HealthPackage: HealthPackage.name,
        });

        patient.health_package = healthPackageName;

        await patient.save();
        // Save the transaction
        await newTransaction.save();
        const newreq = req;
        const newres = res;

        await createHealthPackagesTransaction(newreq, newres, newTransaction._id, patientId, healthPackageName);

    } catch (error) {
        return res.status(500).json({ error: `Error adding health package transaction: ${error.message}` });
    }
};
const createHealthPackagesTransaction = async (req, res, transactionId, patientUsername, healthPackageId) => {

    try {
        // Check if the referenced models exist
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const patient = await Patient.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const HealthPackage = await HealthPackage.findOne({ name: healthPackageId });
        if (!HealthPackage) {
            return res.status(404).json({ error: 'HealthPackageModel not found' });
        }

        // Calculate expiration date (one year from the current date)
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        // Create a new HealthPackagesTransaction instance
        const healthPackagesTransaction = new HealthPackagesTransaction({
            transactionId: transactionId,
            patient: patientUsername,
            HealthPackage: healthPackageId,
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
        const patient = await Patient.findOne({ username: patientId });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        console.log('After Patient Fetch');
        // Find the health package by name
        const healthPackage = await HealthPackage.findOne({ name: healthPackageName });
        if (!healthPackage) {
            return res.status(404).json({ error: 'HealthPackage not found' });
        }
        console.log('After Health Package Fetch');

        // Create a new transaction
        const newTransaction = new Transaction({
            value: value,
            paymentOption: 'healthPackages',
            patient: patientId,
            HealthPackage: healthPackage.name,
        });
        console.log('After Transaction Creation');

        patient.health_package = healthPackageName;
        await patient.save();
        // Save the transaction
        await newTransaction.save();
        console.log('After Saving');
        const newreq = req;
        const newres = res;

        await createHealthPackagesTransaction(newreq, newres, newTransaction._id, patientId, healthPackageName);
        console.log('After Function Creation');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Error adding health package transaction: ${error.message}` });
    }
};
const markHealthPackageTransactionAsRefunded = async (req, res) => {
    try {
        //  const { patientUsername, healthPackageName } = req.params;
        const patientUsernam = req.user.username;

        const healthPackageName = req.query.healthPackageName;

        const patient = await Patient.findOne({
            username: patientUsernam
        })

        if (!patient) {
            return res.status(404).json({ error: 'Patient is  not found' });

        }
        // Find the health package transaction based on patient username and health package name
        const healthPackageTransaction = await HealthPackagesTransaction.findOne({
            patient: patientUsernam,
            HealthPackage: healthPackageName,
        });

        if (!healthPackageTransaction) {
            return res.status(404).json({ error: 'Health package transaction not found' });
        }

        // Find the corresponding transaction
        const transaction = await Transaction.findById(healthPackageTransaction.transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const HealthPackage = await HealthPackage.findone({
            name: healthPackageName
        })

        if (!HealthPackage) {
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
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}
//Sign up as a new Patient
const signUp = async (req, res) => {
    const { username, password, name, email, dob, gender, mobile_number, health_package, Efull_name, Emobile_number, relation } = req.body

    const emergency_contact = { full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation }
    console.log(password, relation);

    const patient = new Patient({
        username, password, name, email, dob, gender,
        mobile_number, health_package, emergency_contact
    })

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

        if (exists) return res.status(400).json({ error: 'Username or Email in use' })

        exists = await Admin.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if (exists) return res.status(400).json({ error: 'Username or Email in use' })

        const user = await Patient.signUp(patient)

        res.status(200).json({ username, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
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
const changePass = async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = req.user;

    user.changePassword(oldPassword, newPassword, function (err) {
        if (err) {
            return res.status(400).json({ mssg: "Something went wrong" })
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
const forgotPass = async (req, res) => {
    const { email } = req.body
    console.log(email);
    // Verify Valid Mail
    let user = await Patient.findOne({ email: email })
    if (!user) {
        user = await Doctor.findOne({ email: email })

        if (!user) {
            user = await Admin.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ err: "Email Address is incorrect" })
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

    return res.status(200).json({ mssg: "tmam" })
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
        await OTP.deleteOne({ _id: verify._id })
        return res.status(200).json({ mssg: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ mssg: "Internal Server Error" });
    }
};
const setPass = async (req, res) => {
    const { newPassword, email } = req.body

    // Regular expression to check for at least one capital letter and one number
    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

    if (!passwordRequirements.test(newPassword)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
    }

    let user = await Patient.findOne({ email: email });

    if (!user) {
        user = await Doctor.findOne({ email: email })

        if (!user) {
            user = await Admin.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ err: "Email Address is incorrect" })
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
            for (let i = 0; i < matchingDoctors.length; i++) {
                console.log(matchingDoctors[i])
                const filter2 = {}
                if (patientID) filter2.patientID = patientID;
                if (date) filter2.date_of_perscription = date;
                if (state) filter2.state = state;
                if (matchingDoctors[i]) filter2.doctorID = matchingDoctors[i]
                console.log(filter2)
                const prescription = await Perscriptions.findOne(filter2)
                prescriptionsarray.push(prescription)

            }
            res.status(200).send(prescriptionsarray);

        } else {
            // If no doctorName is provided, retrieve prescriptions
            const prescriptions = await Perscriptions.find(filter);
            res.status(200).send(prescriptions);
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
        const date = req.query.date;

        let filter = {};

        if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
        if (speciality) filter.speciality = new RegExp(speciality, 'i');
        

        

        console.log('Before Doctor');
        const doctors = await Doctor.find(filter);
        
        console.log('After Doctor');
        const patientHealthPackage = patient.health_package;

        const healthPackage = await HealthPackage.findOne({ name: patientHealthPackage });

        if (!healthPackage) {
            const doctormap = doctors.map(doctor => {
                return {
                    username: doctor.username,
                    email: doctor.email,
                    name: doctor.name,
                    speciality: doctor.speciality,
                    affiliation: doctor.affiliation,
                    education: doctor.education,
                    originalRate: doctor.rate,
                    rateAfterDiscount: doctor.rate,
                    availableDates:doctor.availableDates
                }
            });
            return res.status(200).json(doctormap); // Return here
        }

        const doctorRates = doctors.map(doctor => {
            let rateAfterDiscount = doctor.rate - (doctor.rate * healthPackage.discounts.doctorSession);
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
                availableDates:doctor.availableDates

            };
        });

        return res.status(200).json(doctorRates); // Return here
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
// Function to filter doctors by availability on a certain date and time
const filterDoctorsByAvailability = async (req, res) => {
    const date = req.query.date;

    try {
        const doctors = await Doctor.find({
            availableDates: date
        });
        res.json(doctors);
    } catch (error) {
        console.error('Error filtering doctors by availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getSinglePerscription = async (req, res) => {
    const _id = req.params.perscID

    try {
        const perscription = await Perscriptions.findById(_id).populate('doctorID').populate('patientID')
        res.status(200).json(perscription)
    } catch (error) {
        res.status(400).send(error);
    }
}



const addPatientToDoctor = async (req, res, dr) => {
    try {
        //const { dusername, pusername } = req.body;

        const dusername = dr;
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

        return res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const addPatientToDoctorfam = async (req, res, dr, ph) => {
    try {
        //const { dusername, pusername } = req.body;

        const dusername = dr;
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

        return res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createNotification = async (user, title, body) => {
    try {
        const notification = new Notification({ user: user, title: title, body: body })

        await notification.save()
    } catch (error) {
        console.log(error);
    }
}

const createAppointment = async (req, res) => {
    try {
        const pusername = req.user.username;
        const dusername = req.query.doctorusername;
        const appointmentDate = req.query.date;
        const status = "upcoming";


        // Find the doctor and patient by username
        const doctor = await Doctor.findOne({ username: dusername });
        const patient = await Patient.findOne({ username: pusername });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' });
        }

        doctor.availableDates = doctor.availableDates.filter(item => item != appointmentDate);


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
            appointmentDate: appointmentDate,
            paymentOption: 'Appointment',
            doctor: doctor.username,
            patient: patient.username,
            Refunded: false
        });
        const transactionID = getTransaction._id;

        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username,
            transactionId: transactionID, // Reference the patient by username
            appointmentDate: appointmentDate,
            status: status // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        await doctor.save();
        console.log(appointment);
        const newreq = req
        const newres = res
        // Use the addPatientToDoctor function to add the patient to the doctor's list
        await addPatientToDoctor(newreq, newres, dusername);

        const patientName = patient.name;
        const patientEmail = patient.email
        const doctorName = doctor.name;
        const doctorEmail = doctor.email
        const clinicName = doctor.affiliation;

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'acluser123@hotmail.com',
                pass: 'AMRgames1@',
            },
        });

        const mailOptions = {
            from: 'acluser123@hotmail.com',
            to: patientEmail, // Replace with the recipient's email address
            subject: 'Appointment Confirmation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Confirmation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Confirmation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        const mailOptionsDoc = {
            from: 'acluser123@hotmail.com',
            to: doctorEmail, // Replace with the recipient's email address
            subject: 'Appointment Confirmation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Confirmation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Confirmation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(5000);

        transporter.sendMail(mailOptionsDoc, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        createNotification(patient._id, "Appointment Confirmation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
          Doctor: ${doctorName}
          Date: ${appointmentDate}
          Location: ${clinicName}`)
        createNotification(doctor._id, "Appointment Confirmation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
          Doctor: ${doctorName}
          Date: ${appointmentDate}
          Location: ${clinicName}`)

        return res.status(200).json(appointment)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const createAppointmentfam = async (req, res) => {
    try {
        const pusername = req.query.patient;
        const dusername = req.query.doctorusername;
        const appointmentDate = req.query.date;
        const status = "upcoming";


        // Find the doctor and patient by username
        const doctor = await Doctor.findOne({ username: dusername });
        const patient = await Patient.findOne({ username: pusername });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' });
        }

        doctor.availableDates = doctor.availableDates.filter(item => item != appointmentDate);


        // Check if there is an existing appointment with the same details
        const existingAppointment = await Appointment.findOne({
            doctor: doctor.username,
            patient: patient.username,
            appointmentDate: appointmentDate,
            status: status
        });

        if (existingAppointment) {
            console.log('Appointment with the same details already exists');
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }

        const getTransaction = await Transaction.findOne({
            appointmentDate: appointmentDate,
            paymentOption: 'Appointment',
            doctor: doctor.username,
            patient: patient.username,
            Refunded: false
        });

        const transactionID = getTransaction._id;
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username,
            transactionId: transactionID,// Reference the patient by username
            appointmentDate: appointmentDate,
            status: status // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        await doctor.save();
        const newreq = req
        const newres = res
        // Use the addPatientToDoctor function to add the patient to the doctor's list
        await addPatientToDoctorfam(newreq, newres, dusername, pusername);


        const patientName = patient.name;
        const patientEmail = patient.email
        const doctorName = doctor.name;
        const doctorEmail = doctor.email
        const clinicName = doctor.affiliation;

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'acluser123@hotmail.com',
                pass: 'AMRgames1@',
            },
        });

        const mailOptions = {
            from: 'acluser123@hotmail.com',
            to: patientEmail, // Replace with the recipient's email address
            subject: 'Appointment Confirmation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Confirmation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Confirmation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        const mailOptionsDoc = {
            from: 'acluser123@hotmail.com',
            to: doctorEmail, // Replace with the recipient's email address
            subject: 'Appointment Confirmation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Confirmation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Confirmation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentDate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(5000);

        transporter.sendMail(mailOptionsDoc, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        createNotification(patient._id, "Appointment Confirmation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
          Doctor: ${doctorName}
          Date: ${appointmentDate}
          Location: ${clinicName}`)

        createNotification(doctor._id, "Appointment Confirmation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
          Doctor: ${doctorName}
          Date: ${appointmentDate}
          Location: ${clinicName}`)

        res.status(200).json("Done")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getAppointments = async (req, res) => {
    try {
        const patient = req.query.patient
        let patientUsername
        if (patient) {
            patientUsername = patient
            console.log('ana hena');
        }
        else {
            patientUsername = req.user.username;
            console.log(patientUsername);
        }
        const date = req.query.date;
        const status = req.query.status;

        let filter = { patient: patientUsername };

        const appointments = await Appointment.find(filter);
        console.log(appointments);
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

            const doctor = await Doctor.findOne({ username: appointment.doctor })
            const patient = await Patient.findOne({ username: appointment.patient })

            return isMatched ? { ...appointment.toObject(), doctor, patient } : null;
        }));

        //console.log(filteredAppointments);

        // Remove null values from the array (appointments without matching transactions)
        const finalAppointments = filteredAppointments.filter(appointment => appointment !== null);
        console.log(finalAppointments);
        res.status(200).json(finalAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
    }
};

const refundAppointment = async (req, res) => {
    try {
        const appointmentdate = req.query.appointmentdate;
        const doc = req.query.doc;
        const username = req.query.username;
        let patient
        if (username) {
            patient = username
        }
        else {
            patient = req.user.username;
        }
        console.log(doc, patient);
        const user = req.user.username

        const transactionID = req.query.transactionID;
        console.log(appointmentdate);

        // Find the appointment by ID
        const appointment = await Appointment.findOne({
            doctor: doc,
            patient: patient,
            appointmentDate: appointmentdate,
        });
        console.log(appointment);

        const patient1 = await Patient.findOne({ username: user });
        const doctor1 = await Doctor.findOne({ username: doc });

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
        patient1.wallet += transaction.value;
        doctor1.wallet -= transaction.value;
        await doctor1.save();
        await patient1.save();
        await transaction.save();
        await Appointment.deleteOne({
            doctor: doc,
            patient: patient,
            appointmentDate: appointmentdate,
        });

        const patientName = patient1.name;
        const patientEmail = patient1.email
        const doctorName = doctor1.name;
        const doctorEmail = doctor1.email
        const clinicName = doctor1.affiliation;

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'acluser123@hotmail.com',
                pass: 'AMRgames1@',
            },
        });

        const mailOptions = {
            from: 'acluser123@hotmail.com',
            to: patientEmail, // Replace with the recipient's email address
            subject: 'Appointment Cancellation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Cancellation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Cancellation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentdate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentdate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        const mailOptionsDoc = {
            from: 'acluser123@hotmail.com',
            to: doctorEmail, // Replace with the recipient's email address
            subject: 'Appointment Cancellation',
            html: `
            <!DOCTYPE html>
            <html lang="en">
        
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Appointment Cancellation</title>
              <style>
                /* Your CSS styles here */
              </style>
            </head>
        
            <body>
              <div class="container">
                <h1>Appointment Cancellation</h1>
                <p>Dear ${patientName},</p>
                <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentdate}.</p>
            
                <div class="appointment-details">
                  <p><strong>Doctor:</strong> ${doctorName}</p>
                  <p><strong>Date:</strong> ${appointmentdate}</p>
                  <p><strong>Location:</strong> ${clinicName}</p>
                </div>
            
                <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
            
                <p>Thank you for choosing our services. We look forward to seeing you!</p>
            
                <p>Best regards,<br> ${clinicName}</p>
              </div>
            </body>
            
            </html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(5000);

        transporter.sendMail(mailOptionsDoc, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        createNotification(patient1._id, "Appointment Cancellation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentdate}.
          Doctor: ${doctorName}
          Date: ${appointmentdate}
          Location: ${clinicName}`)

        createNotification(doctor1._id, "Appointment Cancellation", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentdate}.
          Doctor: ${doctorName}
          Date: ${appointmentdate}
          Location: ${clinicName}`)

        // Optionally, you can update the appointment status or perform any other necessary actions

        res.json({ message: 'Appointment refunded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the refund.' });
    }
};



const selectpatient = async (req, res) => {
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
const getWallet = async (req, res) => {
    try {
        const user = req.user

        res.status(200).json({ wallet: user.wallet })

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while selecting the patient.' });
    }
}
const payWithWallet = async (req, res) => {
    const user = req.user

    const { amount, doctorUsername } = req.query

    const newPatientWallet = user.wallet - parseInt(amount, 10)

    try {
        const doctor = await Doctor.findOne({ username: doctorUsername })

        if (!doctor) {
            return res.status(400).json({ error: 'Doctor Not Found' })
        }

        const newDoctorWallet = doctor.wallet + parseInt(amount, 10)

        await Doctor.findByIdAndUpdate(doctor._id, { wallet: newDoctorWallet })

        await Patient.findByIdAndUpdate(user._id, { wallet: newPatientWallet })

        return res.status(200).json({ mssg: 'Successful' })
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}
const linkFamilyMember = async (req, res) => {
    const user = req.user
    const filter = req.query.EmailorPhhone
    const relation = req.query.relation
    // const {filter, relation} = req.body // filter is either email or phone number
    let patient;
    try {

        if (filter.includes("@")) {
            patient = await Patient.findOne({ email: filter })
        } else {
            patient = await Patient.findOne({ mobile_number: filter })
        }

        if (!patient) {
            return res.status(400).json({ mssg: "Patient not Found" })
        }

        if (patient.username === user.username) {
            return res.status(500).json({ mssg: "Gebly Hadwa Yabny We Batal Habal" })
        }

        updateFamilyMember(user, patient, relation)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: error })
    }

}
async function updateFamilyMember(user, patient, relation) {
    await Patient.findOneAndUpdate(
        { _id: user._id },
        {
            $push: {

                family_members: patient._id,
                relation: relation
            }
        })

    let reverseRelation;

    switch (relation) {
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
            if (user.gender === "male")
                reverseRelation = "Son"
            else
                reverseRelation = "Daughter"
    }

    await Patient.findOneAndUpdate(
        { _id: patient._id },
        {
            $push: {
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

        const HealthPackage = await HealthPackage.findOne({ name: healthPackageName });

        if (!HealthPackage) {
            return res.status(404).json({ error: 'Patient or HealthPackage not found' });
        }

        if (patient.health_package == HealthPackage.name) {
            return res.status(200).json({ error: 'You are already subscribed to this health package' });
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

        const { familyMemberUsername } = req.query

        let username

        if (familyMemberUsername) {
            username = familyMemberUsername
        } else {
            username = patient.username

            if (patient.health_package == 'Unsubscribed') {
                return res.status(404).json({ error: 'You are not subscribed to any package' });
            }
        }


        const HpTransaction = await HealthPackagesTransaction.findOneAndUpdate({ patient: username, state: 'subscribed' },
            { state: 'cancelled' })

        if (!HpTransaction) {
            return res.status(404).json({ error: 'HealthPackage Transaction not found' });
        }

        const transaction = await Transaction.findOne(HpTransaction.transactionId)

        const comment = transaction.comments + ' Cancelled '

        console.log(comment);

        await Transaction.findOneAndUpdate(HpTransaction.transactionId, { comments: comment })

        return res.status(200).json({ message: 'Cancellation successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

const getHealthPackage = async (req, res) => {

    const patient = req.user
    let transaction = await HealthPackagesTransaction.findOne({ patient: patient.username, state: 'subscribed' })

    if (!transaction) {
        transaction = await HealthPackagesTransaction.findOne({ patient: patient.username, state: 'cancelled' })
        if (!transaction) return res.status(400).json({ error: 'No Package Transaction Found' })
    }

    const HealthPackageName = patient.health_package;
    console.log(HealthPackageName);
    const healthPackage = await HealthPackage.findOne({ name: HealthPackageName }).exec();

    if (!healthPackage) {
        return res.status(400).json({ error: 'No Package Found' })
    }

    res.status(200).json({ transaction: transaction, HealthPackage: healthPackage });

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
            appointmentDate: appointmentDate,
            paymentOption: "Appointment",
            doctor: doctorUsername,
            patient: patientUsername,
            Refunded: false
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
        console.log(transactionValue + "herereee")

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
            appointmentDate: appointmentDate,
            paymentOption: "Appointment",
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


const getFamilyMembersHealthPackages = async (req, res) => {

    const patient = req.user



    if (!patient) {
        throw new Error('Patient not found');
    }
    const familyMembersHealthPackages = [];
    for (let i = 0; i < (patient.family_members).length; i++) {
        const member = patient.family_members[i]
        const transaction = await HealthPackagesTransaction.findOne({ patient: member.username, state: { $in: ['subscribed', 'cancelled'] } })

        if (!transaction) {
            const input = { username: member.username, name: member.name, state: 'unsubscribed', HealthPackage: 'None' }
            familyMembersHealthPackages[i] = input
        }
        else {
            const state = transaction.state
            familyMembersHealthPackages[i] = { username: member.username, name: member.name, state: state, ...transaction };
        }
    }
    try {

        // const familyMembersHealthPackages = patient.family_members.map(member => ({
        //     username: member.username,
        //     name: member.name,
        //     health_package: member.health_package,
        // }));

        return res.status(200).json({ familyMembersHealthPackages });

    } catch (error) {
        return res.status(500).json({ error });
    }
};



const saveDocuments = async (req, res) => {
    const username = req.user.username;
    const { documents, descriptions } = req.body;



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
        console.log(documents.length + "   " + descriptions.length)

        if (documents.length !== descriptions.length) {
            return res.status(400).json({ message: 'Descriptions and documents arrays must have the same length' });
        }
        console.log("ana hena 4")

        // Map through the arrays and push documents with descriptions to the patient's Documents array
        descriptions.forEach((description, index) => {
            patient.Documents.push({
                description: description,
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
        const patient = await Patient.findOne({ username: username }); // Fetch only the username and Documents fields

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
        const patient = await Patient.findOne({ username: patientId });

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


////////////////////////////////////////////////////////


const medicineDiscountedPrice = async (req, res) => {
    const user = req.user
    const HPname = user.health_package


    try {
        const discount = 0
        const healthPackage = await HealthPackage.findOne({ name: HPname })

        if (healthPackage) discount = healthPackage.discounts.pharmacyMedicine

        res.status(200).send(discount)

    } catch (error) {
        res.status(400).send(error)
    }
}

const viewCart = async (req, res) => {
    // console.log("aaaaah");
    user = req.user;
    var medicines = [];

    const CartItems = user.cart
    let price = 0;
    for (let i = 0; i < CartItems.length; i++) {
        var medicine = await Medicine.findOne({ _id: CartItems[i].medicineid });
        price += medicine.Price * CartItems[i].amount
    }

    try {
        const CartItems = user.cart
        for (let i = 0; i < CartItems.length; i++) {
            var medicine = await Medicine.findOne({ _id: CartItems[i].medicineid });
            const item = {
                Name: medicine.Name,
                MedicalUse: medicine.MedicalUse,
                Price: medicine.Price,
                Description: medicine.Description,
                Quantity: medicine.Quantity,
                activeIngredients: medicine.activeIngredients,
                Sales: medicine.Sales,
                Picture: medicine.Picture,
                Amount: CartItems[i].amount,
                price: price
            }
            medicines.push(item);
        }

        res.status(200).send(medicines);
    }
    catch (error) {
        res.status(400).send({ "error": error });
    }
}

const incAmount = async (req, res) => {
    const MedName = req.params.Name;
    const medicine = await Medicine.findOne({ Name: MedName });
    var user = req.user;
    const quantity = medicine.Quantity;

    const patient = await Patient.findOne({ _id: user._id, "cart.medicineid": medicine._id });

    const CartItems = patient.cart
    var amount = 0;
    for (let i = 0; i < CartItems.length; i++) {
        if (CartItems[i].medicineid.equals(medicine._id)) {
            amount = CartItems[i].amount;
            break;
        }
    }
    amount = amount + 1;
    if (amount > quantity) {
        res.status(400).json({ error: "Maximun Quantity reached" });
    }
    else {
        Patient.findOneAndUpdate({ _id: user._id, "cart.medicineid": medicine._id }, {
            '$set': {
                'cart.$.amount': amount
            }
        }).catch(err => console.log(err));
        res.status(200).json(amount);
    }

}

const decAmount = async (req, res) => {
    const MedName = req.params.Name;
    const medicine = await Medicine.findOne({ Name: MedName });
    var user = req.user;

    const patient = await Patient.findOne({ _id: user._id, "cart.medicineid": medicine._id });

    if (patient) {
        const CartItems = patient.cart
        var amount = 0;
        for (let i = 0; i < CartItems.length; i++) {
            if (CartItems[i].medicineid.equals(medicine._id)) {
                amount = CartItems[i].amount;
                break;
            }
        }
        amount = amount - 1;
        if (amount == 0) {
            Patient.updateOne({ _id: user._id }, {
                '$pull': {
                    cart: { medicineid: medicine._id }
                }
            }).catch(err => console.log(err));
        }
        else {
            Patient.findOneAndUpdate({ _id: user._id, "cart.medicineid": medicine._id }, {
                '$set': {
                    'cart.$.amount': amount
                }
            }).catch(err => console.log(err));
        }
        res.status(200).json(amount);
    }
    else {
        res.status(400).json("Not in Cart");
    }
}

const addToCart = async (req, res) => {

    const MedName = req.params.Name;
    const medicine = await Medicine.findOne({ Name: MedName });
    var user = req.user;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    var CanAdd=true;
    var cart = {
        medicineid: medicine._id,
        amount: 1
    };
    const quantity = medicine.Quantity;

    if(quantity<=0){
        res.status(400).json({ error: "Maximum Amount Reached" });
    }
    else{
    if(medicine.NeedPerscription){
       PatientPerscription = await Perscriptions.findOne({patientID:user._id,date_of_perscription:{
        $gte: oneMonthAgo, // prescriptions on or after one month ago
        $lt: new Date(),   // prescriptions before the current date and time
      },
      medicine:medicine.Name});
      console.log(PatientPerscription);
      if(!PatientPerscription){
        CanAdd=false;
      }
    }
    if(CanAdd){
    const patient = await Patient.findOne({ _id: user._id, "cart.medicineid": medicine._id });
    try {
        if (patient) {
            const CartItems = json.cart
            var amount = 0;
            for (let i = 0; i < CartItems.length; i++) {
                if (CartItems[i].medicineid.equals(medicine._id)) {
                    amount = CartItems[i].amount;
                    break;
                }
            }
            amount = amount + 1;
            if (amount > quantity) {
                res.status(400).json({ error: "Maximum Amount Reached" });
            }
            else {

                Patient.findOneAndUpdate({ _id: user._id, "cart.medicineid": medicine._id }, {
                    '$set': {
                        'cart.$.amount': amount
                    }
                }).catch(err => console.log(err));
                res.status(200).json(amount);
            }
        }
        if (!patient) {
            Patient.findOneAndUpdate({ _id: user._id }, { '$push': { cart: cart } }).catch(err => console.log(err));
            res.status(200).json(amount);
        }
    } catch (error) {
        res.status(400).send('Could not Add')
    }
}
else{
    res.status(400).json({ error: "This Medicine needs a Prescription" });
}
    }
}

const deleteFromCart = async (req, res) => {
    const MedName = req.params.Name;
    const medicine = await Medicine.findOne({ Name: MedName });
    var user = req.user;

    Patient.updateOne({ _id: user._id }, {
        '$pull': {
            cart: { medicineid: medicine._id }
        }
    }).catch(err => console.log(err));

    res.status(200).json("Deleted");
}

const addAddresses = async (req, res) => {
    var user = req.user;
    var address = req.body.address;
    console.log(req.body);
    const patient = await Patient.findOne({ _id: user._id });
    const Addresses = patient.deliveryaddresses;
    if (Addresses.includes(address)) {
        res.status(400).json({ error: "Duplicate Address" })
    }
    else {
        try {
            await Patient.findOneAndUpdate({ _id: user._id }, {
                $addToSet: {
                    deliveryaddresses:
                        address
                }
            });
            res.status(200).json(address);
        }
        catch (error) {
            res.status(400).json({ error: "Wrong entry" })
        }
    }
}

const deliveryaddresses = async (req, res) => {
    var user = req.user;
    res.status(200).json(user.deliveryaddresses);
}

const newOrder = async (req, res) => {
    var user = req.user;
    var TotalPrice = 0;
    const pharmacistList = await Pharmacist.find();
    if (user.cart.length == 0) {
        res.status(400).json({ error: "Cart is empty" })
    }
    else {
        try {
            var medicines = [];
            for (let i = 0; i < user.cart.length; i++) {
                const Med = await Medicine.findOne({_id:user.cart[i].medicineid});
                newQuantity = Med.Quantity - user.cart[i].amount;
                //Out Of Stock Email Part Start
                if(newQuantity==0){

                    try {
                        if (pharmacistList.length > 0) {
                            const transporter = nodemailer.createTransport({
                                service: 'hotmail',
                                auth: {
                                    user: 'acluser123@hotmail.com',
                                    pass: 'AMRgames1@',
                                },
                            });
                
                            for (let i = 0; i < pharmacistList.length; i++) {
                                const email = pharmacistList[i].email;

                            createNotification(pharmacistList[i]._id, "Medicine Out Of Stock", `${Med.Name} is Out of Stock`)

                                const mailOptions = {
                                    from: 'acluser123@hotmail.com',
                                    to: email,
                                    subject: 'Medicine Out of Stock',
                                    text: `${Med.Name} is Out of Stock`,
                                };
                
                                const info = await transporter.sendMail(mailOptions);
                                console.log('Email sent:', info.response);

                            }
                        } else {
                            console.log('No pharmacists found.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }

                }
                //Out Of Stock Email Part End
                newReserved = Med.Reserved + user.cart[i].amount;
                newSales = Med.Sales + (Med.Price * user.cart[i].amount);
                TotalPrice += Med.Price * user.cart[i].amount;
                await Medicine.findOneAndUpdate({_id:user.cart[i].medicineid}, {Quantity:newQuantity, Reserved:newReserved,Sales:newSales});
                console.log(i);
                const medicine = {
                    medicineid: user.cart[i].medicineid,
                    amount: user.cart[i].amount,
                    Name: Med.Name,
                    stock: newQuantity,
                    Reserved: newReserved,
                    Sales: newSales,
                    Returned: Med.Returned
                };
                console.log("before push")
                medicines.push(medicine);
                console.log("after push")
            }
            var address = req.body.address;
            const orderId = new mongoose.Types.ObjectId();
            const order = {
                _id: orderId,
                medicines: user.cart,
                status: 'In delivery',
                deliveryaddress: address,
                TotalPrice:TotalPrice
            }
            const updatedPatient = await Patient.findOneAndUpdate(
                { _id: user._id },
                { $push: { orders: order } },
                { new: true, select: '_id' }
            ).catch(err => console.log(err));
            const c1 = await Patient.findOne({ _id: user._id });
            await Patient.updateOne({ _id: user._id }, { cart: [] }).catch(err => console.log(err));
            console.log(orderId);
            await Orders.create({
                _id:orderId,
                patient : user.username,
                medicines: medicines,
                status: 'In delivery',
                deliveryaddress: address,
                TotalPrice:TotalPrice       
            }).catch(err => console.log(err));
            res.status(200).json(c1);
        }
        catch (error) {
            res.status(400).json({ error: "Wrong entry" })
        }
    }
}


const orders = async (req, res) => {
    var user = req.user;
    const orders = user.orders;
    var ordersreturn = [];
    var TotalPrice = 0;
    try {
        for (let j = 0; j < orders.length; j++) {
            TotalPrice = 0;
            const medicines = user.orders[j].medicines;
            var ordermedicines = [];
            for (let i = 0; i < medicines.length; i++) {
                var medicine = await Medicine.findOne({ _id: medicines[i].medicineid });
                const item = {
                    _id: medicine._id,
                    Name: medicine.Name,
                    MedicalUse: medicine.MedicalUse,
                    Price: medicine.Price,
                    Description: medicine.Description,
                    Quantity: medicine.Quantity,
                    activeIngredients: medicine.activeIngredients,
                    Sales: medicine.Sales,
                    Picture: medicine.Picture,
                    amount: medicines[i].amount
                }
                TotalPrice += medicines[i].amount * medicine.Price
                ordermedicines.push(item);
            }
            var order = {
                _id: orders[j]._id,
                medicines: ordermedicines,
                status: orders[j].status,
                deliveryaddress: orders[j].deliveryaddress,
                totalPrice: TotalPrice
            }
            ordersreturn.push(order);
        }
        res.status(200).json(ordersreturn);
    }
    catch (error) {
        res.status(400).json({ error: "Error" })
    }
}

const deleteOrder = async (req, res) => {
    var user = req.user;
    var id = req.params._id;

    const orders = user.orders
    var medicines = null;
    var ordermedicines = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i]._id == id) {
            medicines = orders[i].medicines;
            break;
        }
    }

    let price = user.wallet;
    for (let i = 0; i < medicines.length; i++) {
        var medicine = await Medicine.findOne({ _id: medicines[i].medicineid });
        newQuantity = medicine.Quantity + medicines[i].amount;
        newReserved = medicine.Reserved - medicines[i].amount;
        newReturned = medicine.Returned + medicines[i].amount;
        newSales = medicine.Sales - (medicines[i].amount * medicine.Price);
        await Medicine.findOneAndUpdate({_id:medicines[i].medicineid}, {Quantity:newQuantity, Reserved:newReserved, Returned:newReturned, Sales:newSales});
        const ordermedicine = {
            medicineid: medicines[i].medicineid,
            amount: medicines[i].amount,
            Name: medicine.Name,
            stock: newQuantity,
            Reserved: newReserved,
            sales:newSales,
            Returned: newReturned
        };
        ordermedicines.push(ordermedicine);
        price += medicine.Price * medicines[i].amount
        console.log('ana hena', price);
        var newQuantity = medicines[i].amount
        var medicine = await Medicine.findOneAndUpdate({ _id: medicines[i].medicineid },{Quantity:newQuantity});
    }

    try {
        await Patient.findOneAndUpdate({ _id: user._id, "orders._id": id }, {
            '$set': {
                'orders.$.status': 'Cancelled'
            }
        }).catch(err => console.log(err));
        await Orders.findOneAndUpdate({ _id: id}, {
            '$set': {
                'status': 'Cancelled',
                medicines: ordermedicines
            }
        }).catch(err => console.log(err));
        await Patient.findOneAndUpdate({ _id: user._id, "orders._id": id }, { wallet: price }).catch(err => console.log(err));
        const c1 = await Patient.findOne({ _id: user._id })
        res.status(200).json(c1.orders);
    }
    catch (error) {
        res.status(400).json({ error: "Wrong entry" })
    }
}

const getCartPrice = async (req, res) => {
    const user = req.user

    try {
        const CartItems = user.cart
        let price = 0;
        for (let i = 0; i < CartItems.length; i++) {
            var medicine = await Medicine.findOne({ _id: CartItems[i].medicineid });
            price += medicine.Price * CartItems[i].amount
            console.log('ana hena', price);
        }

        res.status(200).json(price);
    }
    catch (error) {
        res.status(400).send({ "error": error });
    }
}
const viewWallet=async (req,res)=>{
    const user = req.user;
    res.status(200).json(user.wallet);
}

const getNotification = async (req, res) => {
    const user = req.user
    try {
        const notifications = await Notification.find({ user: user._id })

        if (notifications.length != 0)
            return res.status(200).json({ notifications: notifications })
        else
            return res.status(400).send('Not Found')
    } catch (error) {
        console.log(error);
        return res.status(400).send({ "error": error });
    }
}

const createNotification = async (user, title, body) => {
    try {
        const notification = new Notification({ user: user, title: title, body: body })

        await notification.save()
    } catch (error) {
        console.log(error);
    }
}

const requestFollowUp = async (req, res) => {
    const user = req.user

    const { doctor, appointment, patient } = req.body;

    let username
    if (patient) {
        username = patient
    }
    else {
        username = user.username
    }

    const exist = await FollowUpRequest.findOne({ appointment: appointment })

    if (exist) {
        return res.status(500).send('Exists')
    }

    try {
        const request = new FollowUpRequest({ doctor: doctor, patient: username, appointment: appointment })
        await request.save()

        res.status(200).json({ "mssg": "Request Sent" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ "error": error });
    }
}

const reschedule = async (req, res) => {
    let doctor
    let patient
    const { date, appointment } = req.body
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointment, {
            appointmentDate: date,
            status: 'rescheduled'
        })
        const appointmentDate = date;
        const appointmentTime = date;

        if (updatedAppointment) {
            doctor = await Doctor.findOne({ username: updatedAppointment.doctor })
            patient = await Patient.findOne({ username: updatedAppointment.patient })
            doctor.availableDates = doctor.availableDates.filter(item => item != date);
            doctor.save();
        }

        const patientName = patient.name;
        const patientEmail = patient.email
        const doctorName = doctor.name;
        const doctorEmail = doctor.email
        const clinicName = doctor.affiliation;

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'acluser123@hotmail.com',
                pass: 'AMRgames1@',
            },
        });

        const mailOptions = {
            from: 'acluser123@hotmail.com',
            to: patientEmail, // Replace with the recipient's email address
            subject: 'Appointment Rescheduling',
            html: `
              <!DOCTYPE html>
              <html lang="en">
          
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Confirmation</title>
                <style>
                  /* Your CSS styles here */
                </style>
              </head>
          
              <body>
                <div class="container">
                  <h1>Appointment Confirmation</h1>
                  <p>Dear ${patientName},</p>
                  <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate} at ${appointmentTime}.</p>
              
                  <div class="appointment-details">
                    <p><strong>Doctor:</strong> ${doctorName}</p>
                    <p><strong>Date:</strong> ${appointmentDate}</p>
                    <p><strong>Time:</strong> ${appointmentTime}</p>
                    <p><strong>Location:</strong> ${clinicName}</p>
                  </div>
              
                  <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
              
                  <p>Thank you for choosing our services. We look forward to seeing you!</p>
              
                  <p>Best regards,<br> ${clinicName}</p>
                </div>
              </body>
              
              </html>
            `,
        };

        const mailOptionsDoc = {
            from: 'acluser123@hotmail.com',
            to: doctorEmail, // Replace with the recipient's email address
            subject: 'Appointment Rescheduling',
            html: `
              <!DOCTYPE html>
              <html lang="en">
          
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Confirmation</title>
                <style>
                  /* Your CSS styles here */
                </style>
              </head>
          
              <body>
                <div class="container">
                  <h1>Appointment Confirmation</h1>
                  <p>Dear ${patientName},</p>
                  <p>We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate} at ${appointmentTime}.</p>
              
                  <div class="appointment-details">
                    <p><strong>Doctor:</strong> ${doctorName}</p>
                    <p><strong>Date:</strong> ${appointmentDate}</p>
                    <p><strong>Time:</strong> ${appointmentTime}</p>
                    <p><strong>Location:</strong> ${clinicName}</p>
                  </div>
              
                  <p>Please make sure to arrive on time for your appointment. If you have any questions or need to reschedule, feel free to contact us.</p>
              
                  <p>Thank you for choosing our services. We look forward to seeing you!</p>
              
                  <p>Best regards,<br> ${clinicName}</p>
                </div>
              </body>
              
              </html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        await delay(5000);

        transporter.sendMail(mailOptionsDoc, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        createNotification(patient._id, "Appointment Reschedule", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
        Doctor: ${doctorName}
        Date: ${appointmentDate}
        Location: ${clinicName}`)

        createNotification(doctor._id, "Appointment Reschedule", `We are pleased to confirm your appointment with Dr. ${doctorName} on ${appointmentDate}.
        Doctor: ${doctorName}
        Date: ${appointmentDate}
        Location: ${clinicName}`)

        if (updatedAppointment)
            return res.status(200).json(updatedAppointment)
    } catch (error) {
        console.log(error);
        res.status(400).send({ "error": error });
    }
}

const getNotification = async (req, res) => {
    const user = req.user
    try {
        const notifications = await Notification.find({ user: user._id })

        if (notifications.length != 0)
            return res.status(200).json({ notifications: notifications })
        else
            return res.status(400).send("2araf")
    } catch (error) {
        return res.status(500).send({ "error": error });
    }
}

const payForPerscription = async (req, res) => {
    const user = req.user
    const { persc } = req.body
    try {
        const prescription = await Perscriptions.findById(persc);
        const medicines = prescription.medicine
        for (let i = 0; i < medicines.length; i++) {
            const medicine = await Medicine.findOne({ Name: medicines[i] })

            if (medicine.Quantity === 0) {
                return res.status(400).send('No Stock');
            }
        }

        await Patient.findByIdAndUpdate(
            { _id: user._id },
            { $set: { cart: [] } }
        );

        for (let i = 0; i < medicines.length; i++) {
            const medicine = await Medicine.findOne({ Name: medicines[i] });
            //console.log(user);
            var cart = {
                medicineid: medicine._id,
                amount: 1
            };

            Patient.findOneAndUpdate({ _id: user._id }, { '$push': { cart: cart } }).catch(err => console.log(err));
        }
        res.status(200).send('GO AHEAD AND PAY')
    } catch (error) {
        return res.status(500).send({ "error": error });
    }
}

const checkOnAppointments = async (req, res) => {
    console.log('woah');

    try {
        const upcoming = await Appointment.find({ status: 'upcoming' })
        const FollowUp = await Appointment.find({ status: 'FollowUp' })
        const rescheduled = await Appointment.find({ status: 'rescheduled' })

        const current = new Date();

        for (let i = 0; i < upcoming.length; i++) {
            const date = upcoming[i].appointmentDate

            // Replace backslashes with hyphens
            // Split the formatted date string
            // let [datePart, timePart, hourPart, minutePart] = date.split(':');
            // datePart = datePart.substring(1)
            // console.log(datePart, timePart, hourPart, minutePart);

            // minutePart = minutePart.substring(0, minutes.length - 2)
            // console.log(minutePart);
            // const [yearPart, monthPart, dayPart] = datePart.split('\\');

            // // Create a new Date object
            // const normalDate = new Date(yearPart, monthPart - 1, dayPart, hourPart, minutePart);

            // console.log(normalDate);
        }

        for (let i = 0; i < FollowUp.length; i++) {
            const date = FollowUp[i].appointmentDate

        }

        for (let i = 0; i < rescheduled.length; i++) {
            const date = rescheduled[i].appointmentDate

        }
        return res.status(200).json({ mssg: 'Checking on Dates Done' })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ "error": error });
    }
}

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
    payWithWallet, addTransactionAppointment, createAppointmentfam, addTransactionAppointmentfam,
    refundAppointment, createHealthPackagesTransaction, addHealthPackageTransaction,
    markHealthPackageTransactionAsRefunded, addHealthPackageTransactionfam, saveDocuments, viewMyDocuments, deleteDocument,
    //pharmacy
    medicineDiscountedPrice,
    viewCart,
    incAmount,
    decAmount,
    addToCart,
    deleteFromCart,
    deliveryaddresses,
    newOrder,
    orders,
    deleteOrder,
    addAddresses,
    getCartPrice,

    viewWallet,
    requestFollowUp,
    reschedule,
    getNotification,
    payForPerscription,
    checkOnAppointments

}