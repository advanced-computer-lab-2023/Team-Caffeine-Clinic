const express = require('express');
const router = express.Router();

const { 
    createEmploymentContract,getEmploymentContract,acceptContract,rejectContract
 } = require('../controllers/employmentContractController')


 const {requireAuth} = require('../middleware/requrieAuth')

router.use(requireAuth)


router.post('/createEmploymentContract', createEmploymentContract)
router.get('/getEmploymentContract', getEmploymentContract)
router.patch('/acceptContract', acceptContract)
router.patch('/rejectContract', rejectContract)





module.exports = router;