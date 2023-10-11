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
    createPlatPackage} = require('../controllers/adminController');


const router = express.Router();

router.get('/viewAdmins', getAdmins);
router.get('/getAdmin/:id', getAdmin);
router.post('/addAdmin', createAdmin);
router.delete('/:id', deleteAdmin);


router.get('/viewDoctorApplications', viewDoctorApplication);
router.delete('/deleteDoctor/:id', deleteDoctor);
router.delete('/deletePatient/:id', deletePatient);

router.get('/healthPackages', getHealthPacks)
router.post('/healthPackage/silverpackage', createSilverPackage);
router.delete('/deleteHealthPackage/:id', deletehealthPackage);
router.post('/healthPackage/goldpackage', createGoldPackage);
router.post('/healthPackage/platinumpackage', createPlatPackage);
router.patch('/updateHealthPackage/:id', updateHealthPack); 




module.exports = router;