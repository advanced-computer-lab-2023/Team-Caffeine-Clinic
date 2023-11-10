const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin')

const requireAuth = async(req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
    
        req.user = await Patient.findById(_id).populate('family_members')
        req.type = 'Patient'
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }

}

const requireDoctorAuth = async(req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
    
        req.user = await Doctor.findById(_id)
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }

}

const requireAdminAuth = async(req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
    
        req.user = await Admin.findById(_id)
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = {
    requireAuth,
    requireAdminAuth,
    requireDoctorAuth
}