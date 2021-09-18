
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {
  //getLeaveData,
  getUserMaster,
  getUserMasterById,
  addUserMaster,
  updateUserMasterByUserId,
  deleteUserMasterById

} = require('../controllers/userMasterController');


router.get('/userMaster/:user_id', getUserMasterById)
router.post('/userMaster',  addUserMaster);
router.get('/userMaster',getUserMaster)
router.put('/userMaster/:user_id', updateUserMasterByUserId);
router.delete('/userMaster/:user_id',deleteUserMasterById)


 module.exports = router;

