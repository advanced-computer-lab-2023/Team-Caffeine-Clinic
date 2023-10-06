const express = require('express');
const Admin = require('../models/adminModel');
const {createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    createSilverPackage,
    createGoldPackage,
    createPlatPackage} = require('../controllers/adminController');


const router = express.Router();

router.get('/', getAdmins);

router.get('/:id', getAdmin);

router.post('/', createAdmin);

router.delete('/:id', deleteAdmin);

router.post('/silverpackage', createSilverPackage);
router.post('/goldpackage', createGoldPackage);
router.post('/platinumpackage', createPlatPackage);





module.exports = router;