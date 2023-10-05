const Admin = require('../models/adminModel');

//get Admins 
const getAdmins = async (req, res) => {
    const admins = await Admin.find().sort({createdAt: -1});
    res.status(200).json(admins);
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

module.exports = {
    createAdmin,
    getAdmins,
}