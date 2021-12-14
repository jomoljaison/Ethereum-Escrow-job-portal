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
  else console.log('Database Connects!-----------setUser');
}); 


/* GET users listing. */
router.post('/', function(req, res, next) {
  // empid,firstname,lastname,email,designation,ph,country,employee


  

  data = req.body;
  console.log(data)
  MyContract.methods.whitelistAddress(data.user)
  .send({from:accountAddress, gas : 3000000})
    .then((txn) => {
        res.send(txn);
    })

  //   var user = req.body.user;
  //   var password = req.body.password;


  //   connection.query("insert into createinvoice(user,password) values(?,?)",[user,password],function(err,results,fields){
  //     if(err) throw err;
  //     else{
  //     // res.render("index.ejs");
  //     console.log("Insertion completed")
      
  //     }
  //  });




});

module.exports = router;
