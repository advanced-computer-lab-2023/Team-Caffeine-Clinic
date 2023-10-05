const express = require('express')

const router = express.Router()

//Controllers
const {
    viewFilterPerscriptions
} = require('../controllers/PatientController')

//View and Filter All Perscriptions
router.get('/', viewFilterPerscriptions)

module.exports = router
