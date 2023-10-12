const express = require('express');
const router = express.Router();

const {
    addFamilyMember,
    getFamilyMembers
} = require('../controllers/familyMemberController');


// Add family member
router.post('/addFamilyMember', addFamilyMember);

// Get registered family members
router.get('/getFamilyMembers', getFamilyMembers);





module.exports = router;
