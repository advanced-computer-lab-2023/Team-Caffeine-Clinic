const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')


// Import Models
const Patient = require('../models/Patient');
const Perscriptions = require('../models/Perscriptions');
const Doctor = require('../models/doctor');
const healthPackage = require('../models/healthPackageModel');
const Appointment = require('../models/appointment')


// Passport local Strategy
passport.use(Patient.createStrategy());

// To use with sessions
passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());

//Sign up as a new Patient
const signUp = async(req, res) => {
    const {username, name, email, password, dob, gender, mobile_number, health_package, Efull_name, Emobile_number, relation} = req.body

    const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation} 


    
    const patient = new Patient({username, name, email, dob, gender, mobile_number, health_package, emergency_contact})
    Patient.register(patient, password, function(err, user){
        //console.log("woah");
        if(err){
            //console.log("woah");
            res.status(400).json({err: "Error! Try Again"})
        }
        passport.authenticate("local"), function(req, res){
            console.log("woah");
            res.status(200).json({mssg: "Signed Up successfuly"})
        }
    })
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

const getAppointments = async(req, res) => {
    const patient = req.user
    const patientUsername = patient.username

    try {

        const date = req.query.date;
        const status = req.query.status;

        let filter = {};

        if (date) filter.appointmentDate = date; // Case-insensitive regex search
        if (status) filter.status = new RegExp(status, 'i');
        if (patientUsername) filter.patient = patientUsername


        const appointement = await Appointment.find(filter)
        res.status(200).json(appointement)
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    signUp,
    viewFilterPerscriptions,
    getSinglePerscription,
    estimateRate,
    getAppointments,
    filterDoctorsByAvailability
}