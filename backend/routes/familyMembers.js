const express = require('express');
const router = express.Router();
const passport = require('passport');
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());

const {
    addFamilyMember,
    getFamilyMembers
} = require('../controllers/familyMemberController');

const requireAuth = require('../middleware/requrieAuth')

router.use(requireAuth)


// Add family member
router.post('/addFamilyMember', addFamilyMember);

// Get registered family members
router.get('/getFamilyMembers', getFamilyMembers);





module.exports = router;
