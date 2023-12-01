const express = require('express');
const router = express.Router();

const {
    getPharmacists,
    getSinglePharmacist,
    createPharmacist
} = require('../controllers/adminController');
const Pharmacist = require('../models/Pharmacist');

const {requireAdminAuth} = require('../middleware/requrieAuth');
router.use(requireAdminAuth)

router.get('/getPharmacist', getPharmacists);

router.get('/getSinglePharmacist/:username', getSinglePharmacist);

router.post('/createPharmacist', createPharmacist)

module.exports = router;
