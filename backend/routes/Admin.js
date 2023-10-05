const express = require('express');
const Admin = require('../models/adminModel');
const {createAdmin,
    getAdmins} = require('../controllers/adminController');


const router = express.Router();

router.get('/', getAdmins);

router.post('/', createAdmin);


module.exports = router;