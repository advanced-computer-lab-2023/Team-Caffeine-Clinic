// #Task route solution
const medicineModel = require('../models/Medicine.js');
const Patient = require('../models/Patient.js')
const HealthPackage = require('../models/healthPackageModel.js')
const { default: mongoose } = require('mongoose');
var fs = require('fs');
var path = require('path');
 
const addMedicine = async(req,res) => {
   var name = req.body.Name;
   var activeIngredients = req.body.activeIngredients;
   var price = req.body.Price;
   var quantity = req.body.Quantity;
   var description = req.body.Description;

   try {
      const newMedicine = await medicineModel.create({       
         Name: name,
         activeIngredients: activeIngredients,
         Price: price,
         Quantity:quantity,
         Description:description})
      res.status(200).json(newMedicine);
  }
  catch(error){
      res.status(400).json({error: "Duplicate Name"})
  }
   }


const editMedicine = async (req, res) => {
   var name = req.body.Name;
   var updatedDetails = req.body.activeIngredients;
   var updatedPrice = req.body.Price;
  
   medicineModel.findOneAndUpdate({Name: name}, {activeIngredients: updatedDetails, Price: updatedPrice}).catch(err => console.log(err));
   res.status(200).send(req.body);
} 

const addPicture = async (req, res) => {
  // console.log("plz come here");
  var name = req.body.Name;
  var picture = req.body.Picture;
 
  medicineModel.findOneAndUpdate({Name: name}, {Picture:picture}).catch(err => console.log(err));
  res.status(200).send(req.body);
}    

   //Ibra
const medicineDiscountedPrice = async (req) => {
   const user = req.user;

   const HPname = user.health_package
  //  console.log(HPname);

   //const HPname = user.health_package;
 
   try {
     let discount = 0;
     const healthPackage = await HealthPackage.findOne({ name: HPname });
     //console.log(healthPackage);
     if (healthPackage) discount = healthPackage.discounts.pharmacyMedicine;
     return discount;
   } catch (error) {
     throw error;
   }
}
    

const viewDiscountMedicine = async (req, res) => {
  try {
    const medicines = await medicineModel.find({});
    const discountedMedicines = await Promise.all(
      medicines.map(async (medicine) => {
        const discount = await medicineDiscountedPrice(req);
        const discountedPrice = medicine.Price - (medicine.Price * discount);
        return {
          ...medicine._doc,
          discountedPrice: discountedPrice,
        };
      })
    );
    res.status(200).send(discountedMedicines);
  } catch (error) {
    res.status(400).send(error);
  }
};
    

const viewAvailableMedicine = async (req, res) => {
   console.log('ana hena');
   const medicines = await medicineModel.find({});
   console.log(medicines);
   res.status(200).send(medicines);
 }

 const viewDistinctMedicalUse = async (req, res) => {
   const medicines = await medicineModel.distinct('MedicalUse');
   console.log(medicines);
   res.status(200).send(medicines);
 }

const searchMedicine = async (req, res) => {
   const medicine = await medicineModel.find({Name: { "$regex": '^' + req.params.search + '| '+ req.params.search ,"$options": "si" }},{});
   res.status(200).json(medicine);
   
}
const filterMedicine = async (req, res) => {
   const medicine = await medicineModel.find({MedicalUse: { "$regex": '^' + req.params.filter + '| '+ req.params.filter ,"$options": "si" } });
   // console.log(req.params.filter);
   res.status(200).json(medicine);
   
}
const ArchiveMedicine = async (req, res) => {
  const MedName = req.params.Name;
  let medicine = await medicineModel.findOne({ Name: MedName }); // Use let instead of const

  try {
    if (medicine.Archive) {
      medicine = await medicineModel.findOneAndUpdate({ Name: MedName }, { Archive: false });
    } else {
      medicine = await medicineModel.findOneAndUpdate({ Name: MedName }, { Archive: true });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: "Error Occurred" });
  }
};


const alternatives = async (req, res) => {
  const _id = req.body._id;
  const activeIngredients = req.body.activeIngredients;

  try {
    // Find all medicines with activeIngredients except the one with _id
    const alternatives = await medicineModel.find({
      _id: { $ne: _id },
      'activeIngredients.0': activeIngredients[0],
    });

    console.log(alternatives);
    res.status(200).json(alternatives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const userInfo = async (req, res) => {
  try{
  res.status(200).json(req.user);
}
  catch{
    res.status(400).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
   viewAvailableMedicine,
   viewDistinctMedicalUse,
   searchMedicine,
   filterMedicine,
   addMedicine,
   editMedicine,
   viewDiscountMedicine,
   addPicture,
   ArchiveMedicine,
   alternatives,
   userInfo
};
//addMedicine,editMedicine, medicineHome