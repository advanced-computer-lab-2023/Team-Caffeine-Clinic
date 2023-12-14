const express = require('express');

// const Medicine= require('../Models/Medicine');

const {viewAvailableMedicine,
    viewDistinctMedicalUse,
    searchMedicine,
    filterMedicine,
    addMedicine,
    editMedicine,
    viewDiscountMedicine,
    addPicture,
    ArchiveMedicine
} = require("../controllers/MedicineController");

const{
    accessChat,
    fetchChats,
    allMessages,
    sendMessage,
    viewDoctors
}=require('../controllers/ChatController')

const{
pharmacistchangepassword,
viewWallet
}=require('../controllers/PharmacistController')

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

router.post("/chatPharma/accessChats",requirePharmacistAuth ,accessChat);

router.get("/chatPharma/allChats",requirePharmacistAuth ,fetchChats);

router.get("/chatPharma/getDoctors", requirePharmacistAuth,viewDoctors);

router.get("/chatPharma/getMessages/:chatId", requirePharmacistAuth,allMessages);

router.post("/chatPharma/sendMessage", requirePharmacistAuth,sendMessage);

router.post("/changePharmaPass", requirePharmacistAuth,pharmacistchangepassword);

router.put("/archiveMed/:Name", requirePharmacistAuth,ArchiveMedicine);

router.get("/wallet", requirePharmacistAuth,viewWallet);



module.exports = router;