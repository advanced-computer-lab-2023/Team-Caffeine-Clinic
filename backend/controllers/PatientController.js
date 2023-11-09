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
    
    // Verify Valid Mail
    const user = await Patient.findOne({email: email})
    if(!user){
        console.log('shit');
        return res.status(400).json({err: "Email Address is incorrect"})
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

const verifyOTP = async(req, res) => {
    const {otp, email} = req.body

    const verify = await OTP.findOne({email: email})

    if(verify.OTP != otp){
        console.log("Wrong OTP");
        return res.status(400).json({mssg: "Wrong OTP"})
    }

    //console.log("tmam");
    // If OTP is correct, you can allow the user to set a new password
    return res.status(200).json({ mssg: "OTP verified successfully" });
}

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
    console.log('yady el neela');

    console.log(req.session);

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
const getAppointments = async (req, res) => {
   username = req.user.username;
   date = req.query.date;
   appointmentStatus  = req.query.status;
   
    let query = { patient: username };

    // Check for the optional filters
    if (date && !appointmentStatus ) {
        query.appointmentDate = { $regex: date, $options: 'i' };
    } else if (appointmentStatus  && !date) {
        query.status = appointmentStatus ;
    } else if (date && appointmentStatus ) {
        query = {
            patient: username,
            appointmentDate: { $regex: date, $options: 'i' },
            status: appointmentStatus ,
        };
    }

    try {
        const appointments = await Appointment.find(query)
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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
    
    const newPatientWallet = user.wallet - amount

    try {
        const doctor = await Doctor.findOne({username: doctorUsername})

        if(!doctor){
            return res.status(400).json({error: 'Doctor Not Found'})
        }

        const newDoctorWallet = doctor.wallet + amount

        await Patient.findByIdAndUpdate(doctor._id, {wallet: newDoctorWallet})
        
        await Patient.findByIdAndUpdate(user._id, {wallet: newPatientWallet})
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

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
    createAppointment,addPatientToDoctor,
    selectpatient,
    getWallet,
    payWithWallet
}