
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {

  getEventParticipates,
 // getEventParticipatesByEventParticipatesId,
  addEventParticipates,
 // updateEventParticipatesByEventParticipatesId,

} = require('../controllers/eventParticipatesController');


//router.get('/eventParticipates/:event_participates_id', getEventParticipatesByEventParticipatesId)
router.post('/eventParticipates',  addEventParticipates);
router.get('/eventParticipates',getEventParticipates)
//router.put('/eventParticipates/:event_participates_id', updateEventParticipatesByEventParticipatesId);


 module.exports = router;

