const { default: mongoose } = require('mongoose')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')

const jwt = require('jsonwebtoken')

//Models
const DoctorAppplication = require('../models/DoctorApplication');
const Patient = require('../models/Patient')
const Doctor = require('../models/doctor')
const Admin = require('../models/admin')
const EmplymentContract = require('../models/emplymentContract')

const Pharmacist = require('../models/Pharmacist')
const PharmacistAppplication = require('../models/PharmacistApplication')


const createToken = (_id, type) => {
  return jwt.sign({_id: _id, type: type}, process.env.SECRET, {expiresIn: '3d'})
}

//Sign up as a new Patient
const signUp = async(req, res) => {
  const {username, password, name, email, dob, gender, mobile_number, health_package, Efull_name, Emobile_number, relation} = req.body

  const emergency_contact = {full_name: Efull_name, mobile_number: Emobile_number, relation_to_the_patient: relation} 

  const patient = new Patient({username, password, name, email, dob, gender, 
      mobile_number, health_package, emergency_contact})

      const passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

      if (!passwordRequirements.test(password)) {
        console.log("ah yany")
        return res.status(400).json({ error: 'Password Does not meet minimum requirments.' });
      } 
      else
      if((password).length<6){
        return res.status(400).json({ error: 'Password length must be at least 6.' });
      }
      else
      {
      try { 
      const user = await Patient.signUp(patient)
      res.status(200).json({username, user})
      } catch (error) {
      res.status(400).json({error: error.message})
      }
      }
}

//Apply as a Pharmacist
const applyPharmacist = async(req, res) => {
  const {ID,License,Degree,username, password, email, name, speciality, rate, affiliation, education} = req.body

  const pharmacistApp = new PharmacistAppplication({ID,License,Degree,username, password, email, name, speciality, rate, affiliation, education})
  
  const passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

  if (!passwordRequirements.test(password)) {
    console.log("ah yany")
    return res.status(400).json({ error: 'Password Does not meet minimum requirments.' });
  } 
  else
  if((password+"").length<6){
    return res.status(400).json({ error: 'Password length must be at least 6.' });
  }
         else
             {

       try {
           await pharmacistApp.save()       
           res.status(200).json({pharmacistApp})
          } catch (error) {
          res.status(400).json({error:"Error"});
         }
           }
}

//Apply as a Doctor
const applyDoctor = async(req, res) => {
    const {username, password, email, name, speciality, rate, affiliation, education, availableDates,ID,Medical_licenses,Medical_degree} = req.body

    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;


    if (!passwordRequirements.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
    }

    const doctorApp = new DoctorAppplication({username, password, email, name, speciality, rate, affiliation, education, availableDates,ID,Medical_licenses,Medical_degree})

    await doctorApp.save()

    res.status(200).json(doctorApp)
}

// const loginPatient = passport.authenticate('patient-local')
//const loginDoctor = passport.authenticate('doctor-local')
//const loginAdmin = passport.authenticate('admin-local')

const loginPatient = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Patient.login(username, password)

    //create token
    const token = createToken(user._id, 'Patient')

    res.status(200).json({type: 'Patient', token})
  } catch (error) {
    res.status(400).json({error: error}) 
  }
}

const loginPharmacist = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Pharmacist.login(username, password)
    //create token
    const token = createToken(user._id, 'Pharmacist')

    res.status(200).json({type: 'Pharmacist', token})
  } catch (error) {
    res.status(400).json({error: error}) 
  }
}

const loginDoctor = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Doctor.login(username, password);
    //create token
   const  isAccepted = await checkAcceptedStatus(username);
   console.log(isAccepted);
   if(isAccepted){
    const token = createToken(user._id, 'Doctor')

    res.status(200).json({type: 'Doctor', token})}
    else {
      const token = createToken(user._id, 'Doctor')

    res.status(200).json({type: 'Pending', token})
    }
  } catch (error) {
    res.status(400).json({error: error}) 
  }
}
const checkAcceptedStatus = async (doctorUsername) => {
  try {
    const employmentContract = await EmplymentContract.findOne({ doctor: doctorUsername });

    if (!employmentContract) {
      throw new Error('Employment contract not found for the specified doctor.');
    }

    return employmentContract.accepted;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while checking the accepted status.');
  }
};
const loginAdmin = async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await Admin.login(username, password)

    //create token
    const token = createToken(user._id, 'Admin')

    res.status(200).json({type: 'Admin', token})
  } catch (error) {
    res.status(400).json({error: error}) 
    console.log(error);
  }
}

const  loginfunc = function(req, res){
  //req.login()
  console.log(req.user);
}

const loginPatientfunc = function(req, res){
    console.log('hima is here');
    console.log(req.user);
    const token = createToken(req.user._id, "Patient")
    // console.log(req.user.username);
    res.status(200).json({type: 'Patient', token: token, mssg: req.session})
}

const loginDocfunc = function(req, res){
    console.log('hima is here');
    const token = createToken(req.user._id, "Doctor")
    // console.log(req.user.username);
    res.status(200).json({type: 'Doctor', token: token})
}

const loginAdminfunc = function(req, res){
    console.log('hima is here');
    const token = createToken(req.user._id, "Admin")
    // console.log(req.user.username);
    res.status(200).json({type: 'Admin', token: token})
}

// const loginAsPatient = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Patient.findOne({username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

// const loginAsDoctor = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Doctor.findOne({username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

// const loginAsAdmin = async(req, res) => {
//     const {username} = req.body

//     try {
//         const user = await Admin.findOne({Username: username})

//         if (user) {
//             req.user = user;
//             console.log(req.user._id);
//             res.status(200).send('Login successful');
//           } else {
//             res.status(401).send('Login failed');
//           }


//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

const logout = function(req, res, next) {
  console.log(req.user);
    req.logout(function(err) {
      if (err) { 
        console.log(err);
        return next(err); }
    });
  }


module.exports = {
    applyDoctor,
    loginPatientfunc,
    loginAdminfunc,
    loginDocfunc,
    loginAdmin,
    loginPatient,
    loginDoctor,
    loginfunc,
    logout,
    signUp,
    //pharmacy
    applyPharmacist,
    loginPharmacist,
}