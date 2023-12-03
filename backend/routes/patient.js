const express = require('express')

const passport = require('passport')

const router = express.Router()

const {
    getFamilyMembersHealthPackages,
    filterDoctorsByAvailability,
    patientchangepassword,
    subscribeToHealthPackage, unsubscribeFromHealthPackage, getHealthPackage,
    linkFamilyMember,
    createAppointment, 
    addPatientToDoctor,
    getAppointments,
    selectpatient, 
    getWallet, 
    payWithWallet,addTransactionAppointment,createAppointmentfam,addTransactionAppointmentfam,
    refundAppointment,createHealthPackagesTransaction,addHealthPackageTransaction
    ,markHealthPackageTransactionAsRefunded,addHealthPackageTransactionfam,saveDocuments,viewMyDocuments,deleteDocument,
    //pharmacy
    viewCart,
    incAmount,
    decAmount,
    addToCart,
    deleteFromCart,
    addAddresses,
    deliveryaddresses,
    newOrder,
    orders,
    deleteOrder,
    getCartPrice
} = require('../controllers/PatientController')

const {
    healthPackagePayWithWallet, payMedicineWithWallet
} = require('../controllers/paymentController')

const {
    getFamilyDiscount
} = require('../controllers/familyMemberController')

const {
    checkOnHealthPackageTransaction
} = require('../controllers/healthPackagesController')

const {
    requireAuth,
} = require('../middleware/requrieAuth')


// const {payWithWallet} = require('../controllers/paymentController')

router.post('/checkOnHealthPackageTransaction', checkOnHealthPackageTransaction)


router.use(requireAuth)
//add appointment  
router.post('/createAppointment', createAppointment)
router.post('/createAppointmentfam', createAppointmentfam)


router.post('/createHealthPackagesTransaction', createHealthPackagesTransaction)
router.post('/addHealthPackageTransaction', addHealthPackageTransaction)
router.post('/addHealthPackageTransactionfam', addHealthPackageTransactionfam)
router.post('/markHealthPackageTransactionAsRefunded', markHealthPackageTransactionAsRefunded)


router.post('/saveDocuments', saveDocuments)
router.get('/viewMyDocuments',viewMyDocuments)
router.post('/deleteDocument', deleteDocument)



router.post('/refundAppointment', refundAppointment)


router.post('/addTransactionAppointment', addTransactionAppointment)
router.post('/addTransactionAppointmentfam', addTransactionAppointmentfam)



//add a patient to a doc 
router.patch('/addPatientToDoctor', addPatientToDoctor)
//filter  a doctor by speciality and/or availability on a certain date and at a specific time
router.get('/filterDoctorsByAvailability',filterDoctorsByAvailability)
router.post('/subscribe',subscribeToHealthPackage)
router.post('/unsubscribe',unsubscribeFromHealthPackage)
router.get('/getHealthPackage',getHealthPackage)
router.get('/getAppointments',getAppointments)

router.get('/getFamilyDiscount', getFamilyDiscount)

router.get('/selectpatient',selectpatient)

router.get('/getFamilyMembersHealthPackages',getFamilyMembersHealthPackages)

// Wallet
router.get('/getWallet', getWallet)

// Pay With Wallet
router.post('/payWithWallet', payWithWallet)

router.post('/healthPackagePayWithWallet', healthPackagePayWithWallet)



router.post('/linkFamilyMember', linkFamilyMember)

router.post('/patientchangepassword', patientchangepassword);

//pharmacy
router.get("/userCart", viewCart);
router.get("/getCartPrice", getCartPrice)
router.put("/addToCart/:Name",addToCart);
router.delete('/deleteFromCart/:Name', deleteFromCart);
router.put("/incAmount/:Name", incAmount);
router.put("/decAmount/:Name",decAmount);
router.post('/addAddress', addAddresses)
router.get('/deliveryaddresses', deliveryaddresses)
router.post('/neworder', newOrder)
router.get('/orders', orders)
router.post('/cancelorder/:_id', deleteOrder)
router.post('/payMedicineWithWallet', payMedicineWithWallet)


module.exports = router