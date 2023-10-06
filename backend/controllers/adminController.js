const Admin = require('../models/adminModel');
const mongoose = require('mongoose');
const HealthPackage = require('../models/healthPackageModel');

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
    try {
        const admin = await Admin.create({Username,Password})
        res.status(200).json(admin)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete an admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such admin'})
    }
  
    const admin = await Admin.findOneAndDelete({_id: id})
  
    if(!admin) {
      return res.status(400).json({error: 'No such admin'})
    }
  
    res.status(200).json(admin)
  }

  const createSilverPackage = async (req, res) => {
      try {
    const silverPackage = await HealthPackage.create({
        name: 'Silver Package',
        description: 'Patient pays 3600 LE per year',
        servicesIncluded: [],
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

  const createGoldPackage = async (req, res) => {
    try {
    const goldPackage = await HealthPackage.create({
        name: 'Gold Package',
        description: 'Patient pays 6000 LE per year',
        servicesIncluded: [],
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

  const createPlatPackage = async (req, res) => {
    try {
        const platinumPackage = await HealthPackage.create({
            name: 'Platinum Package',
            description: 'Patient pays 9000 LE per year',
            servicesIncluded: [],
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


module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    createSilverPackage,
    createPlatPackage,
    createGoldPackage
}