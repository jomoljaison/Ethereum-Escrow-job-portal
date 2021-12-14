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
		console.log('Connected..cvc! searchjob');
	}
}); 
  
  
router.get('/', function(req, res, next) {
    res.render('searchEmployee');
  });
  

   router.post('/',(req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM escrow WHERE jobname LIKE ? OR location LIKE ?', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('searchjob', {escrow: rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });


  module.exports = router;