const express = require('express')
const doctor = require('../models/doctor')

const {
    createDoctor,
    patientsWithUpcomingAppointments,
    getDoctorByusername,
    updateDoctorProfile,
    updateRate,
    updateEmail,
    createPatient,
    createAppointment,
    selectpatient,
    getAllHealthRecords,
    addPatientToDoctor,
    myPatients

} = require('../controllers/doctorInfocontroller')

const router = express.Router()




router.get('/', (req, res) => {
    res.json({ mssg: 'get doctor info' })
})

// //get a single patient
// router.get('/getDoctorByusername', getDoctorByusername)

//get all patient AllHealthRecords with a doc
router.get('/getAllHealthRecords', getAllHealthRecords)

//get all patient with a doc
router.get('/myPatients', myPatients)

// sorting the patient by the appointement date doneeeeeeeeeeeeee
router.get('/patientsWithUpcomingAppointments', patientsWithUpcomingAppointments)


//get a patient by name  34   doneeeeeee
router.get('/selectpatient', selectpatient)


//create a doctor
router.post('/createDoctor', createDoctor)


//update doctor info 
router.patch('/updateDoctor', updateDoctorProfile)
router.patch('/updateRate', updateRate)
router.patch('/updateEmail', updateEmail)

// //add patient
// router.post('/createPatient', createPatient)

//add appointment  
router.post('/createAppointment', createAppointment)

//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)



module.exports = router