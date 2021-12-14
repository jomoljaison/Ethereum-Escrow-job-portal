var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConn  = require('../lib/db');

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'escrow'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..cvc! searchemp filter');
	}
}); 
  
  
router.get('/', function(req, res, next) {
    res.render('searchemp');
  });
  

   router.post('/',(req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM employee WHERE designation LIKE ? OR country LIKE ?', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('searchemp', {employee: rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });


  module.exports = router;