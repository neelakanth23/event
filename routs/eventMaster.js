
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {

  getEventMaster,
  getEventMasterByEventId,
  addEventMaster,
  updateEventMasterByEventId,
  deleteEventMasterByEventId

} = require('../controllers/eventMasterController');


router.get('/eventMaster/:event_id', getEventMasterByEventId)
router.post('/eventMaster',  addEventMaster);
router.get('/eventMaster',getEventMaster)
router.put('/eventMaster/:event_id', updateEventMasterByEventId);
router.delete('/eventMaster/:event_id',deleteEventMasterByEventId)


 module.exports = router;

