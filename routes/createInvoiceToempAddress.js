var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');

//mysql connection
const mysql = require('mysql');
const multer=require('multer'); 
var uuid = require('uuid')

const upload= multer({storage:multer.memoryStorage()});
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'escrow'
});

connection.connect(function(error){
  if(!!error) console.log(error);
  else console.log('Database Connects!-----------createInvoiceToempAddress');
}); 
router.get('/', function(req, res, next) {
  res.render('/');
});

router.post('/', function (req, res, next) {
    
  // employee  id  companyname   employeename  invonumber  work  salary  uploadFile

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
    data = req.body;
   // uid = req.body.id;
   myFileBuffer = req.files.uploadFile.data;
   console.log(myFileBuffer);
   ipfs.files.add(myFileBuffer, function (err, file) {
     if (err) throw err;
 
     let url = `https://ipfs.io/ipfs/${file[0].hash}`;
     console.log(`Url --> ${url}`);
  
    console.log(data);
    MyContract.methods.createInvoiceToempAddress(data.employee,data.id,data.companyname,data.employeename,data.invonumber,data.work,data.salary,file[0].hash).send({from:accountAddress, gas : 3000000})

    res.send(`Url -------------> ${url}`);

 
  console.log("12345678910111213141516171819120212223");


    });
           if (!req.files) {
              res.send("No file upload")
      	     } 
     	         // for any file like pdf,docs etc. upload
      	         else {

                  const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
    data = req.body;
   // uid = req.body.id;
   myFileBuffer = req.files.uploadFile.data;
   console.log(myFileBuffer);
   ipfs.files.add(myFileBuffer, function (err, file) {
     if (err) throw err;
 
     let uploadFile = `https://ipfs.io/ipfs/${file[0].hash}`;
     console.log(`uploadFile-------------------------> ${uploadFile}`);

                  // var file = req.files.uploadFile; 
      	             var fileName = file.name;
      	             console.log(fileName);
      	            //  var uuidname = uuid.v1(); // this is used for unique file name
  // employee  id  companyname   employeename  invonumber  work  salary  uploadFile
                    var employee = req.body.employee;
                    var id = req.body.id;
                    var companyname = req.body.companyname;
                    var employeename = req.body.employeename;
                    var invonumber = req.body.invonumber;
                    var work = req.body.work;
                    var salary = req.body.salary;

    connection.query("insert into createinvoice(employee,id, companyname, employeename,invonumber,work,salary,uploadFile) values(?,?,?,?,?,?,?,?)",[employee,id,companyname,employeename,invonumber,work,salary,uploadFile],function(err,results,fields){
      if(err) throw err;
      	               
      console.log("DB success","employee---------",employee)
      console.log("DB success","companyname-----",companyname)
      console.log("DB success","IPFS HASH----------",uploadFile)
    })
               })
              }
           });

module.exports = router;

