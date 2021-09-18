//const pg = require('pg');

const mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'manegement',
  password: '1234',

ssl: {
    rejectUnauthorized: false
  }
});


db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database.....')
    }

})

module.exports = db;