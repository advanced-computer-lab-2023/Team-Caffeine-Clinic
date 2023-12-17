const mongoose = require('mongoose');

const Admin = require('../models/admin');
const PharmacistApplication = require('../models/PharmacistApplication');

const Pharmacist = require('../models/Pharmacist')
const OTP = require('../models/OTP')
const nodemailer = require('nodemailer');

//Import Schemas / Models
const HealthPackage = require('../models/healthPackageModel');
const DoctorApplication = require('../models/DoctorApplication');
const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');

const bcrypt = require('bcrypt');
const EmplymentContract = require('../models/emplymentContract');

//get all Admins 
const getAdmins = async (req, res) => {
    const admins = await Admin.find().sort({createdAt: -1});
    res.status(200).json(admins);
}

// get a single Admin
const getAdmin = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such admin'})
    }
  
    const admin = await Admin.findById(id)
  
    if (!admin) {
      return res.status(404).json({error: 'No such admin'})
    }
  
    res.status(200).json(admin)
  }

//Create a new Admin 
const createAdmin = async (req, res) => {
    const {Username, Password, Email} = req.body;

    const admin = new Admin({username: Username, password: Password, email: Email})

    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;


    if (!passwordRequirements.test(Password)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
    }else
    if((password).length<6){
      return res.status(400).json({ error: 'Password length must be at least 6' });
    }

    try {
      const user = await Admin.signUp(admin)

      res.status(200).json({Username, user, Email})
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

// delete an admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid admin ID' });
    }

    const admin = await Admin.findOneAndDelete({ _id: id });

    if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
}
};

//View All Applications
const viewDoctorApplication = async(req, res) => {
  try{
    const doctorApplications = await DoctorApplication.find();
    res.status(200).json(doctorApplications)
  } catch(error){
    res.status(400).json({error: "Error"})
  }
}

const viewPatients = async(req, res) => {
  try{
    const patients = await Patient.find();
    res.status(200).json(patients)
  } catch(error){
    res.status(400).json({error: "Error"})
  }
}

//Delete a doctor from the system
const deleteDoctor = async(req, res) => {
  const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such doctor'})
    }
    
    const doc = await Doctor.findOneAndDelete({_id: id})

    if(!doc) {
      return res.status(400).json({error: 'No such doctor'})
    }

    const employmentContract = await EmplymentContract.findOneAndDelete({doctor: doc.username})
  
    res.status(200).json(doc)
}
//Remove a doctor application from the system
const deleteDocApp = async(req, res) => { 
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Doctor Application'})
  }

  const docApp = await DoctorApplication.findOneAndDelete({_id: id})

  if(!docApp) {
    return res.status(400).json({error: 'No such Doctor Application'})
  }

  res.status(200).json(docApp)
}



// Delete a Patient from the system
const deletePatient = async(req, res) => { 
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Patient'})
  }

  const pat = await Patient.findOneAndDelete({_id: id})

  if(!pat) {
    return res.status(400).json({error: 'No such Patient'})
  }

  res.status(200).json(pat)
}




  //Packages
  
  const createHealthPackage = async (req, res) => {
    const {name,
          description,
          servicesIncluded,
          basePrice,
          discounts,
          } = req.body;
    try {
        const hp = await HealthPackage.create({name,description,servicesIncluded,basePrice,discounts})
        res.status(200).json(hp)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }



//Get all packages
const getHealthPacks = async(req, res) => {
  try{
    const healthpack = await HealthPackage.find();
    res.status(200).json(healthpack)
  } catch(error){
    res.status(400).json({error: "Error"})
  }
}


// 1. Silver
  const createSilverPackage = async (req, res) => {
      try {
    const silverPackage = await HealthPackage.create({
        name: 'Silver Package',
        description: 'Patient pays 3600 LE per year',
        servicesIncluded: '',
        basePrice: 3600,
        discounts: {
          doctorSession: 0.4, // 40% discount on doctor's sessions
          pharmacyMedicine: 0.2, // 20% discount on pharmacy medicines
          familySubscription: 0.1, // 10% discount on family members' subscriptions
        },
      });  
      res.status(200).json(silverPackage);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }

  //Gold
  const createGoldPackage = async (req, res) => {
    try {
    const goldPackage = await HealthPackage.create({
        name: 'Gold Package',
        description: 'Patient pays 6000 LE per year',
        servicesIncluded: '',
        basePrice: 6000,
        discounts: {
          doctorSession: 0.6, // 60% discount on doctor's sessions
          pharmacyMedicine: 0.3, // 30% discount on pharmacy medicines
          familySubscription: 0.15, // 15% discount on family members' subscriptions
        },
      });
      
      res.status(200).json(goldPackage);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }

  //Plat
  const createPlatPackage = async (req, res) => {
    try {
        const platinumPackage = await HealthPackage.create({
            name: 'Platinum Package',
            description: 'Patient pays 9000 LE per year',
            servicesIncluded: '',
            basePrice: 9000,
            discounts: {
              doctorSession: 0.8, // 80% discount on doctor's sessions
              pharmacyMedicine: 0.4, // 40% discount on pharmacy medicines
              familySubscription: 0.2, // 20% discount on family members' subscriptions
            },
          });
      res.status(200).json(platinumPackage);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }

  //Delete Package
  const deletehealthPackage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such HealthPackage'})
    }

    const healthPackage = await HealthPackage.findOneAndDelete({_id: id})

    if(!healthPackage) {
      return res.status(400).json({error: 'No such healthPackage'})
    }

    res.status(200).json(healthPackage)
  }

  // update a Health package
const updateHealthPack = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Health Package'})
    }
  
    const healthpackage = await HealthPackage.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!healthpackage) {
      return res.status(400).json({error: 'No such Health Package'})
    }
  
    res.status(200).json(healthpackage)
}

  
//const bcrypt = require('bcryptjs'); // Ensure you have bcryptjs installed and required

const adminchangepassword = async (req, res) => {
  const { newPassword } = req.body; // The new password is expected to be sent in the body of the request
  const adminId = req.user._id; // Get the admin's ID from the user object in the request

  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).json({ error: 'Invalid admin ID' });
  }

  // Regular expression to check for at least one capital letter and one number
  const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

  if (!passwordRequirements.test(newPassword)) {
      return res.status(400).json({ error: 'Password must contain at least one capital letter, ones small letter, and one number.' });
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hash = await bcrypt.hash(newPassword, salt); // Hash the new password with the salt

    // Find the admin by ID
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    // Set the new password to the hashed password
    admin.password = hash;

    // Save the admin with the new hashed password
    await admin.save();

    // Respond with a success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  //View All Applications
  const viewPharmacistApplication = async(req, res) => {
    try{
      const pharmacistApplications = await PharmacistApplication.find()

      res.status(200).json(pharmacistApplications)
    } catch(error){
      res.status(400).json({error: "Error"})
    }
  }
  
  const createPharmacist = async(req, res) => {
    // console.log("w ana kman");
    const {
        username,
        password,
        email,
        name,
        speciality,
        rate,
        affiliation, // Add the email field to the request body
        education,
        ID,
        License,
        Degree,
    } = req.body;
  
     const pharmacist=new Pharmacist({ID:ID,License:License,Degree:Degree,username: username, 
      name: name, speciality: speciality, rate: rate, 
      affiliation: affiliation, email: email, education: education, password :password});
  
    try {
      const user = await Pharmacist.signUp(pharmacist)
  
      res.status(200).json({username, user})
  } catch (error) {
      res.status(400).json({error: error.message})
  }
  };

    //Remove a pharmacist application from the system
    const deletePharmApp = async(req, res) => { 
      const { id } = req.params
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Doctor Application'})
      }
    
      const pharmApp = await PharmacistApplication.findOneAndDelete({_id: id})
    
      if(!pharmApp) {
        return res.status(400).json({error: 'No such Doctor Application'})
      }
    
      res.status(200).json(pharmApp)
    }

  //Delete a pharmacist from the system
  const deletePharmacist = async(req, res) => {
    const { id } = req.params
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such pharmacist'})
      }
    
      const pharm = await Pharmacist.findOneAndDelete({_id: id})
    
      if(!pharm) {
        return res.status(400).json({error: 'No such doctor'})
      }
    
      res.status(200).json(pharm)
  }

  // Get pharmacist details by username
const getSinglePharmacist = async (req, res) => {
  try {
      const pharmacist = await Pharmacist.findOne({ username: req.params.username });
      console.log(pharmacist);
      if (!pharmacist) return res.status(404).send("Pharmacist not found");
      res.status(200).send(pharmacist);
      console.log("yaay");
  } catch (error) {
    console.log("oops");
      res.status(500).send(error);
  }
};

// Get all pharmacists with optional name and/or speciality filter
const getPharmacists = async (req, res) => {
  const name = req.query.name;
  const speciality = req.query.speciality;

  let filter = {};

  if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
  if (speciality) filter.speciality = new RegExp(speciality, 'i');

  try {
      const pharmacists = await Pharmacist.find(filter);
      res.status(200).send(pharmacists);
      console.log(pharmacists);
  } catch (error) {
      res.status(400).send(error);
  }
  
};

const changePassA = async(req, res) => { 
  const {oldPassword, newPassword} = req.body

  const user = req.user;

  user.changePassword(oldPassword, newPassword, function(err){
      if(err){
          return res.status(400).json({mssg: "Something went wrong"})
      }
  })
}

const setPassA = async(req, res) => {
  const {newPassword, email} = req.body

  const user = await Admin.findOne({email: email});

  const passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

  if (!passwordRequirements.test(newPassword)) {
    console.log("ah yany")
    return res.status(400).json({ error: 'Password must contain at least one capital letter and one number.' });
  } 
  else
  if((newPassword).length<6){
    return res.status(400).json({ error: 'Password length must be at least 6' });
  }
         else
             {

  try{
    Admin.setPassword(email, newPassword ,res)
      // return res.status(202).json({ mssg: "Password Changed Successfully" });
  } catch(Error){
      // return res.status(400).json({error: error})
  }
}

}

function generateOTPA() {
  // Generate a random number between 100000 and 999999
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;

  return otp;
}

const forgotPassA = async(req, res) => {
  const {email} = req.body
  
  // Verify Valid Mail
  const user = await Admin.findOne({email: email})
  if(!user){
      return res.status(400).json({err: "Email Address is incorrect"})
  }

  const otp = await OTP.findOne({email: email})

  if(!otp){

  const randomOTP = generateOTPA();

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
  else{
      return res.status(400).json({error: "OTP already sent"})

  }
}

const verifyOTPA = async(req, res) => {
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

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    viewDoctorApplication,
    createSilverPackage,
    createPlatPackage,
    createGoldPackage,
    deletehealthPackage,
    deleteDoctor,
    getHealthPacks,
    updateHealthPack,
    viewPatients,
    createHealthPackage,
    deleteDocApp,
    deletePatient,
    adminchangepassword,
    //Pharmacy
    viewPharmacistApplication,
    createPharmacist,
    deletePharmApp,
    deletePharmacist,
    getSinglePharmacist,
    getPharmacists,
    changePassA,
    setPassA,
    forgotPassA,
    verifyOTPA
}