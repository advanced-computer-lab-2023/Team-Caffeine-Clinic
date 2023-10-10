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
    deletePatient,
    createPlatPackage} = require('../controllers/adminController');


const router = express.Router();

router.get('/', getAdmins);

router.get('/getAdmin/:id', getAdmin);
router.post('/', createAdmin);
router.delete('/:id', deleteAdmin);
router.get('/viewDoctorApplications', viewDoctorApplication);

router.post('/healthPackage/silverpackage', createSilverPackage);
router.post('/healthPackage/goldpackage', createGoldPackage);
router.post('/healthPackage/platinumpackage', createPlatPackage);
router.delete('/deleteHealthPackage/:id', deletehealthPackage);
router.delete('/deleteDoctor/:id', deleteDoctor);
router.delete('/deletePatient/:id', deletePatient);

router.patch('/updateHealthPackage/:id', updateHealthPack); 





module.exports = router;