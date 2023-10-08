const express = require('express');
const Admin = require('../models/admin');
const {createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    viewDoctorApplication,
    createSilverPackage,
    deletehealthPackage,
    createGoldPackage,
    updateHealthPack,
    createPlatPackage} = require('../controllers/adminController');


const router = express.Router();

router.get('/', getAdmins);

router.get('/:id', getAdmin);

router.post('/', createAdmin);

router.delete('/:id', deleteAdmin);

router.get('/viewDoctorApplications', viewDoctorApplication);

router.post('/healthPackage/silverpackage', createSilverPackage);
router.post('/healthPackage/goldpackage', createGoldPackage);
router.post('/healthPackage/platinumpackage', createPlatPackage);
router.delete('/healthPackage/:id', deletehealthPackage);

// router.patch('/healthPackage/:id', updateHealthPack); 





module.exports = router;