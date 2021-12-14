var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
		console.log('Connected..cvc! managerview');
	}
}); 
  
  
router.get('/', function(req, res, next) {
    res.render('login');
  });
  
    router.post('/',(req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    // User the connection
    connection.query('SELECT * FROM employee WHERE email = ? AND password = ? ', [email, password], (err, rows) => {
      if(err) 
    {
      console.log("JOMOL JAISON,KANNNAMPILLY HOUSE KANNIKKARAR KALLETTUMKARA P.O ")
    } 
    else
    {
          res.render('searchPersonal',{employee:rows});
    }
      
    });
  });

  module.exports = router;