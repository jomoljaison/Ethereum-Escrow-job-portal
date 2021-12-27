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
  else console.log('Database Connects!-----------addjob');
}); 
router.get('/', function(req, res, next) {
  res.render('addjob');
});


// jobname,location,jtype,jd,abtcompany



router.post('/', function(req, res, next) {


  var jobid = req.body.jobid;
var jobname = req.body.jobname;
var location = req.body.location;
  var jtype = req.body.jtype;
  var jd = req.body.jd;
  var abtcompany = req.body.abtcompany;
  var boss = req.body.boss;

  
  data = req.body;
  console.log(data)
  // jobname,location,jtype,jd,abtcompany

  MyContract.methods.addjob(data.jobid,data.jobname, data.location ,data.jtype, data.jd, data.abtcompany,data.boss)
  .send({from:accountAddress, gas : 3000000})
    .then((txn) => {
    console.log(txn)
    })



    connection.query("insert into escrow(jobid,jobname,location,jtype,jd,abtcompany,boss) values(?,?,?,?,?,?,?)",[jobid,jobname,location,jtype,jd,abtcompany,boss],function(err,results,fields){
      if(err) throw err;
      else{
      res.render("addjob.ejs");
      console.log("ok!...")
      
      }
   });
});




module.exports = router;
