const express = require('express');
const Admin = require('../models/admin');
const {
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    viewDoctorApplication,
    createSilverPackage,
    deletehealthPackage,
    deleteDoctor,
    createGoldPackage,
    updateHealthPack,
    getHealthPacks,
    deletePatient,
    viewPatients,
    deleteDocApp,
    createHealthPackage,
    createPlatPackage,
    adminchangepassword,
    //pharmacy
    viewPharmacistApplication,
    deletePharmApp,
    deletePharmacist,
    createPharmacist
} = require('../controllers/adminController');

const {requireAdminAuth} = require('../middleware/requrieAuth')



const router = express.Router();

router.use(requireAdminAuth)

//Admin routes
router.get('/viewAdmins', getAdmins);
router.get('/getAdmin/:id', getAdmin);
router.post('/addAdmin', createAdmin);
router.delete('/:id', deleteAdmin);
router.post('/adminchangepassword', adminchangepassword);

//Doctor & Doctor application routes
router.delete('/deleteApp/:id',deleteDocApp);
router.get('/viewDoctorApplications', viewDoctorApplication);
router.delete('/deleteDoctor/:id', deleteDoctor);

//patient routes
router.delete('/deletePatient/:id', deletePatient);
router.get('/viewPatients',viewPatients);

//Health package routes
router.post('/createHealthPackage', createHealthPackage);
router.get('/healthPackages', getHealthPacks)
router.post('/healthPackage/silverpackage', createSilverPackage);
router.delete('/deleteHealthPackage/:id', deletehealthPackage);
router.post('/healthPackage/goldpackage', createGoldPackage);
router.post('/healthPackage/platinumpackage', createPlatPackage);
router.patch('/updateHealthPackage/:id', updateHealthPack); 

//Pharmacist
router.delete('/deleteApp/:id',deletePharmApp);
router.post('/acceptApp',createPharmacist)
router.get('/viewPharmacistApplication', viewPharmacistApplication);
router.delete('/deletePharmacist/:id', deletePharmacist);


module.exports = router;