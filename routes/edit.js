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
		console.log('Connected..cvc! edit.js');
	}
}); 


router.get('/edit/:id',(req, res) => {
    const id = req.params.id;
    let sql = `Select * from escrow where id = ${id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('view/edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user : result[0]
        });
    });
});


  module.exports = router;