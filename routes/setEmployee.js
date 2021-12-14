// const { router } = require("../app");
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
  else console.log('Database Connects!-----------setipfs');
}); 
router.get('/', function(req, res, next) {
  res.render('/');
});


/* GET users listing. */
router.post('/', function(req, res, next) {
  // empid,firstname,lastname,email,designation,ph,country,employee

  
  var empid = req.body.empid;
  var firstname = req.body.firstname;
var lastname = req.body.lastname;
var email = req.body.email;
  var ph = req.body.ph;
  var country = req.body.country;

  var address = req.body.address;
  var designation = req.body.designation;
  var password = req.body.password;
  

  

  data = req.body;
  console.log(data)
  MyContract.methods.setEmployee(data.empid, data.firstname ,data.lastname, data.email, data.ph,data.country,data.address,data.designation,data.password)
  .send({from:accountAddress, gas : 3000000})
    .then((txn) => {
        res.send(txn);
    })




    connection.query("insert into employee(empid,firstname,lastname,email,ph,country,address,designation,password) values(?,?,?,?,?,?,?,?,?)",[empid,firstname,lastname,email,ph,country,address,designation,password],function(err,results,fields){
      if(err) throw err;
      else{
      // res.render("index.ejs");
      console.log("Insertion completed")
      
      }
   });
});

module.exports = router;
