const express = require('express')
const doctorinfoSchema = require('../Schema/doctorinfoSchema')

const {
    createDoctor,
    getDoctorByusername,
    updateDoctorProfile,
    updateRate,
    updateEmail,
    createPatient,
    createAppointment,
    addPatientToDoctor

} = require('../controllers/doctorInfocontroller')

const router = express.Router()




router.get('/', (req, res) => {
    res.json({ mssg: 'get doctor info' })
})

//get a single patient
router.get('/getDoctorByusername', getDoctorByusername)



//create a doctor
router.post('/createDoctor', createDoctor)


//update doctor info 
router.patch('/updateDoctor', updateDoctorProfile)
router.patch('/updateRate', updateRate)
router.patch('/updateEmail', updateEmail)

//add patient
router.post('/createPatient', createPatient)

//add appointment 
router.post('/createAppointment',createAppointment)

//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)



module.exports = router