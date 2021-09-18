const express = require('express')
const app = express()
var cors = require("cors");
const db = require('./db');
var cors = require("cors");
//var session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userMasterRouts = require('./routs/userMaster');
const eventMasterRouts = require('./routs/eventMaster');
const eventParticipatesRouts = require('./routs/eventParticipates');

const session = require('express-session');


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
});



app.use("/", userMasterRouts);
app.use("/", eventMasterRouts);
app.use("/", eventParticipatesRouts);


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log('server is listening on port', PORT))
