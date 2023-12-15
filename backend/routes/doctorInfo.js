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
    saveDocumentsForPatient
    
    
} = require('../controllers/doctorInfocontroller')

const{
    accessChat,
    fetchChats,
    allMessages,
    viewPharmacists,
    sendMessage,
}=require('../controllers/ChatController')

const {
    filterDoctorsByAvailability
} = require('../controllers/PatientController')

const {requireDoctorAuth} = require('../middleware/requrieAuth')

const router = express.Router()



router.use(requireDoctorAuth)


router.get('/', (req, res) => {
    res.json({ mssg: 'get doctor info' })
})

// //get a single patient
router.get('/getDoctorByusername', getDoctorByusername)

//get all patient AllHealthRecords with a doc
router.get('/getAllHealthRecords', getAllHealthRecords)

router.get('/getDocumentsForLoggedInDoctorPatients', getDocumentsForLoggedInDoctorPatients)

router.post('/saveDocumentsForPatient', saveDocumentsForPatient)

//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)

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


router.post("/chatDoc/accessChats", accessChat);
router.get("/chatDoc/allChats", fetchChats);
router.get("/chatDoc/getMessages/:chatId", allMessages);
router.get("/chatDoc/viewPharmacists", viewPharmacists);
router.post("/chatDoc/sendMessage", sendMessage);


module.exports = router