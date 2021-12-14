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
		console.log('Connected..cvc! viewjob');
	}
}); 

router.get('/',(req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM escrow";
  let query = connection.query(sql, (err, rows) => {
    if(err) {
      // render to views/escrow/index.ejs
      res.render('viewjob',{escrow:''});   
  } else {
      // render to views/escrow/index.ejs
      res.render('viewjob',{escrow:rows});
  
  }
    });
   } );


  
   


  module.exports = router;