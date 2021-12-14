var express = require('express');
var router = express.Router();

const mysql = require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'escrow'
  });
  
  connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connects!-------------index.js');
  });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





 
router.get('/',(req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM job";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('viewjob', {
          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
          job : rows
      });
  });
});
module.exports = router;
