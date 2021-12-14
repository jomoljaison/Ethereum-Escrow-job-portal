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
		console.log('Connected..cvc! viewemp');
	}
}); 
  
router.get('/',(req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM employee";
  let query = connection.query(sql, (err, rows) => {
    if(err) {

      res.render('viewemp',{employee:''});   
  } else {

      res.render('viewemp',{employee:rows});
  
  }
    });
   } );


  
   

   router.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from employee where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user : result[0]
        });
    });
});


  module.exports = router;