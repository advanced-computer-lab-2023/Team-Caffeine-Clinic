const express = require('express');

// const Medicine= require('../Models/Medicine');

const {viewAvailableMedicine,
    viewDistinctMedicalUse,
    searchMedicine,
    filterMedicine,
    addMedicine,
    editMedicine,
    viewDiscountMedicine,
    addPicture
} = require("../controllers/MedicineController");

const {requirePharmacistAuth} = require('../middleware/requrieAuth');


const router = express.Router();
router.get("/viewAvailableMedicine", viewAvailableMedicine);

router.post("/addMedicine",requirePharmacistAuth,addMedicine);
router.get('/viewDiscountMedicine', viewDiscountMedicine);
router.put("/editMedicine", requirePharmacistAuth,editMedicine);
router.get("/search/:search",searchMedicine);
router.get("/viewDistinct", viewDistinctMedicalUse);
router.get("/filter/:filter",filterMedicine);
router.put("/addPicture",requirePharmacistAuth ,addPicture);

module.exports = router;