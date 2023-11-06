const FamilyMember = require('../models/familyMember');
const mongoose = require('mongoose');

const Patient = require('../models/Patient');

const passport = require('passport');
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());


// Add family member
const addFamilyMember = async (req, res) => {

  const user = req.user

  const patientID = user.id

  const {name, nationalID, age, gender, relation} = req.body

  const member = {patientID, name, nationalID, age, gender, relation}

  try {
      // const familyMember = new FamilyMember(req.body);
      const familyMember = await FamilyMember.create(member); 
      // await familyMember.save();
      res.status(200).json(familyMember);
  } catch (error) {
      res.status(400).json({error: error.message});
  }
};

// Get registered family members
const getFamilyMembers = async (req, res) => {

  const user = req.user

  console.log(req.session);
  
  const patientID = user._id

  try {
      const familyMembers = await FamilyMember.find({patientID});
      res.status(200).send(familyMembers);
  } catch (error) {
      res.status(400).send('error getting familyMembers')
  }
};

// // Get registered family members with id
// router.get('/:patientID', async (req, res) => {
//     try {
//         const familyMembers = await FamilyMember.find({ patientID: req.params.patientID });
//         res.status(200).send(familyMembers);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = {
  addFamilyMember,
  getFamilyMembers
}

