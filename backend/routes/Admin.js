const express = require('express');
const Admin = require('../models/admin');
const {createAdmin,
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
    createPlatPackage} = require('../controllers/adminController');


const router = express.Router();

//Admin routes
router.get('/viewAdmins', getAdmins);
router.get('/getAdmin/:id', getAdmin);
router.post('/addAdmin', createAdmin);
router.delete('/:id', deleteAdmin);

//Doctor & Doctor application routes
router.get('/viewDoctorApplications', viewDoctorApplication);
router.delete('/deleteDoctor/:id', deleteDoctor);

//patient routes
router.delete('/deletePatient/:id', deletePatient);
router.get('/viewPatients',viewPatients);

//Health package routes
router.get('/healthPackages', getHealthPacks)
router.post('/healthPackage/silverpackage', createSilverPackage);
router.delete('/deleteHealthPackage/:id', deletehealthPackage);
router.post('/healthPackage/goldpackage', createGoldPackage);
router.post('/healthPackage/platinumpackage', createPlatPackage);
router.patch('/updateHealthPackage/:id', updateHealthPack); 




module.exports = router;