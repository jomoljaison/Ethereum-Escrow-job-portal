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
		console.log('Connected..cvc! apply');
	}
}); 

router.get('/', function(req, res, next) {
	res.render('searchjob', { title: 'Express' });
  });
  
  
  router.get('/edit/:id', function(req, res, next) {
	var UserId= req.params.id;
	var sql=`SELECT * FROM escrow WHERE id=${UserId}`;
	connection.query(sql, function (err, rows) {
	  if (err) throw err;
	 
	  res.render('apply', { title: 'User List', user: rows[0]});
	});
  });
  

  module.exports = router;