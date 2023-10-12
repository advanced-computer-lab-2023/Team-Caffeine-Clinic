const FamilyMember = require('../models/familyMember');
const mongoose = require('mongoose');


// Add family member
const addFamilyMember = async (req, res) => {
  try {
      // const familyMember = new FamilyMember(req.body);
      const familyMember = await FamilyMember.create(req.body); 
      // await familyMember.save();
      res.status(200).json(familyMember);
  } catch (error) {
      res.status(400).json({error: error.message});
  }
};

// Get registered family members
const getFamilyMembers = async (req, res) => {
  try {
      const familyMembers = await FamilyMember.find({});
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

