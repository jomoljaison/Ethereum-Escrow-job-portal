var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'',
	password:'',
	database:'escrow'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..cvc db.js!');
	}
});

module.exports = connection;
