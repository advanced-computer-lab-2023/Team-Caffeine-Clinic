const Admin = require('../models/admin');
const mongoose = require('mongoose');

//Import Schemas / Models
const HealthPackage = require('../models/healthPackageModel');
const DoctorApplication = require('../models/DoctorApplication');
const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');

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
    const {Username , Password} = req.body;
        Admin.register({username: Username}, Password, function(err, user) {
          if(err){
            console.log(err);
            return res.status(400).json({err: err})
        }
            return res.status(200).json({mssg: "Signed Up successfuly"})
        })
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
        docSession,
        medicine,
        family
        } = req.body;
        const discounts = {doctorSession:docSession, pharmacyMedicine:medicine,familySubscription:family}
  try {
      const hp = await HealthPackage.create({name,description,servicesIncluded,basePrice,discounts})
      console.log({name,description,servicesIncluded,basePrice,discounts});
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
    deletePatient
}