const express = require('express')

const router = express.Router();

const {
    Report,
    ReportMedicines,
    ReportByDate,
    ReportMedicinesByDate,
    ReportByMedicine,
    ReportMedicinesByMedicine,
    ReportByDateAndMedicine,
    ReportMedicinesByDateAndMedicine,
    Dates,
    Medicines
} = require('../controllers/OrdersController')



router.post('/Report', Report)
router.post('/ReportMedicines', ReportMedicines)
router.post('/ReportByDate', ReportByDate)
router.post('/ReportMedicinesByDate', ReportMedicinesByDate)
router.post('/ReportByMedicine', ReportByMedicine)
router.post('/ReportMedicinesByMedicine', ReportMedicinesByMedicine)
router.post('/ReportByDateAndMedicine', ReportByDateAndMedicine)
router.post('/ReportMedicinesByDateAndMedicine', ReportMedicinesByDateAndMedicine)
router.post('/Dates', Dates)
router.post('/Medicines', Medicines)


module.exports = router
