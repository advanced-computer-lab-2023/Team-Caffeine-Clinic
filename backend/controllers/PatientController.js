const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');


// Import Models
const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const healthPackage = require('../models/healthPackageModel');
const Appointment = require('../models/appointment')
const OTP = require('../models/OTP');
//const { default: HealthPackages } = require('../../frontend/src/pages/HealthPackages')

const Transaction = require('../models/transaction');

// Passport local Strategy
//passport.use(Patient.createStrategy());

// To use with sessions
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

//Sign up as a new Patient
const signUp = async(req, res) => {
    const {username, password, name, email, dob, gender, mobile_number, health_package, Efull_name, Emobile_number, relation} = req.body

    const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation} 

    const patient = new Patient({username, password, name, email, dob, gender, 
        mobile_number, health_package, emergency_contact})

    try {
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
            return res.status(400).json({err: "Email Address is incorrect"})
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
        return res.status(200).json({ mssg: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ mssg: "Internal Server Error" });
    }
};


const setPass = async(req, res) => {
    const {newPassword, email} = req.body

    const user = await Patient.findOne({email: email});

    try{
        Patient.setPassword(email, newPassword)
        return res.status(202).json({ mssg: "Password Changed Successfully" });
    } catch(error){
        return res.status(400).json({error: error})
    }
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(newPassword, salt)
    
    // user.setPassword(newPassword, async(err) => {
    //     if(err){
    //         console.log(err);
    //         return res.status(400).json({mssg: "Something went wrong"})
    //     }

    //     try {
    //         await user.save();
    //         console.log("Password updated");
    //         return res.status(202).json({ mssg: "Password Changed Successfully" });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).json({ mssg: "Error saving user with new password" });
    //     }
       
    // })

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
        console.log('ana hena');
        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }
        
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username, // Reference the patient by username
            appointmentDate: appointmentDate,
            status: status // Convert the appointmentDate to a Date object
        });

        await appointment.save();
        await doctor.save();
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
        console.log('ana hena');
        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment with the same details already exists' });
        }
        
        // Create a new appointment
        const appointment = new Appointment({
            doctor: doctor.username, // Reference the doctor by username
            patient: patient.username, // Reference the patient by username
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

        let filteredAppointments = appointments.filter(appointment => {
            let isMatched = true;

            if (date) {
                isMatched = isMatched && appointment.appointmentDate.includes(date);
            }

            if (status) {
                isMatched = isMatched && appointment.status === status;
            }

            return isMatched;
        });

        res.json(filteredAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching appointments.' });
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

        res.json({ patient: selectedPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while selecting the patient.' });
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

       if (patient.health_package == 'No package') {
        return res.status(404).json({ error: 'You are not subscribed to any package' });
       }

        const updatedPatient = await Patient.findOneAndUpdate(
            { _id: patient._id },
            { health_package: 'No package' },
            { new: true } 
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient or HealthPackage not found' });
        }
        
        res.json({ message: 'Unsubscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

const getHealthPackage = async (req, res) => { 
    try {
        const patient = req.user

       // console.log(_id);
            const HealthPackageName = patient.health_package;
            console.log(HealthPackageName);

            const HealthPackage = await healthPackage.findOne({ name: HealthPackageName }).exec();

            // if (HealthPackage.name == "no Package"){
            //     return res.status(404).json({ error:'error '});
            // }
           
         res.status(200).json(HealthPackage);
         console.log(HealthPackage);
        }
         catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
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


module.exports = {
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
    subscribeToHealthPackage,
    unsubscribeFromHealthPackage,
    getHealthPackage,
    linkFamilyMember,
    createAppointment,
    addPatientToDoctor,
    selectpatient,
    getWallet,
    payWithWallet,addTransactionAppointment,createAppointmentfam,addTransactionAppointmentfam
}