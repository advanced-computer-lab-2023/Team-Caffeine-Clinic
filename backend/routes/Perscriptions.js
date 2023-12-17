const express = require('express')

const router = express.Router()

//Controllers
const {
    viewFilterPerscriptions, getSinglePerscription
} = require('../controllers/PatientController')

const {
    createPersc, getDoctorName
} = require('../controllers/PerscriptionsController')

const {requireAuth} = require('../middleware/requrieAuth')

router.use(requireAuth)

//View and Filter All Perscriptions
router.get('/', viewFilterPerscriptions)

router.get('/singlePersc/:perscID', getSinglePerscription)

router.get('/doctor/:id', getDoctorName)

module.exports = router
