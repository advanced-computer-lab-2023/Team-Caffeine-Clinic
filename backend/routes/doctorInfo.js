const express = require('express')
const doctor = require('../models/doctor')

const {
    getDoctors,
    getSingleDoctor,
    getAppointments
} = require('../controllers/doctorController');

const {
    createDoctor,
    patientsWithUpcomingAppointments,
    getDoctorByusername,
    updateDoctorProfile,
    updateRate,
    updateEmail,
    searchmyPatients,
    // createPatient,
    createAppointment,
    selectpatient,
    getAllHealthRecords,
    addPatientToDoctor,
    myPatients,
    doctorchangepassword,
    add_available_slots,
    getCompletedAppointmentsForDoctor,
    createfollowUPAppointment,
    changeToFollowUp,
    getDocumentsForLoggedInDoctorPatients,
    saveDocumentsForPatient,
    getFollowUpRequests,
    acceptFollowUPAppointment,
    rejectRequest,
    refundAppointment,
    getNotification
} = require('../controllers/doctorInfocontroller')

const {
    
    filterDoctorsByAvailability
} = require('../controllers/PatientController')

const {
    createPersc, getDoctorName, getPerscDetails
} = require('../controllers/PerscriptionsController')

const {requireDoctorAuth} = require('../middleware/requrieAuth')

const router = express.Router()



router.use(requireDoctorAuth)


router.get('/', (req, res) => {
    res.json({ mssg: 'get doctor info' })
})

router.get('/getNotification', getNotification)

router.get('/getPerscDetails', getPerscDetails)

router.post('/addPerscription', createPersc)

router.get('/getFollowUpRequests', getFollowUpRequests)

// //get a single patient
router.get('/getDoctorByusername', getDoctorByusername)

//get all patient AllHealthRecords with a doc
router.get('/getAllHealthRecords', getAllHealthRecords)

router.get('/getDocumentsForLoggedInDoctorPatients', getDocumentsForLoggedInDoctorPatients)

router.post('/saveDocumentsForPatient', saveDocumentsForPatient)

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
//router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)

//get all patient with a doc
router.get('/myPatients', myPatients)

// sorting the patient by the appointement date doneeeeeeeeeeeeee
router.get('/patientsWithUpcomingAppointments', patientsWithUpcomingAppointments)


//get a patient by name  34   doneeeeeee
router.get('/selectpatient', selectpatient)

router.get('/searchmyPatients', searchmyPatients)

//create a doctor
router.post('/createDoctor', createDoctor)
router.get('/getCompletedAppointmentsForDoctor', getCompletedAppointmentsForDoctor)
router.post('/createfollowUPAppointment', createfollowUPAppointment)
router.post('/acceptFollowUPAppointment', acceptFollowUPAppointment)
router.post('/rejectRequest', rejectRequest)
router.post('/refundAppointment', refundAppointment)

//update doctor info 
router.patch('/updateDoctor', updateDoctorProfile)
router.patch('/updateRate', updateRate)
router.patch('/updateEmail', updateEmail)


router.patch('/changeToFollowUp', changeToFollowUp)


//add my available time slots for appointments
router.patch('/add_available_slots', add_available_slots)
// //add patient
// router.post('/createPatient', createPatient)

//add appointment  
router.post('/createAppointment', createAppointment)

//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)

router.get('/appointments', getAppointments)

// Route to handle doctor password change
router.post('/doctorchangepassword', doctorchangepassword);


module.exports = router