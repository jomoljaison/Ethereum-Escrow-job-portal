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
  else console.log('Database Connects!-----------sendmsgtoboss');
}); 
router.get('/', function(req, res, next) {
  res.render('/');
});



router.post('/', function (req, res, next) {

    


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
    MyContract.methods.sendmsgtoboss(data.boss,data.employee,data.position,file[0].hash) .send({ from: accountAddress, gas : 6000000 })
    
    .then((txn) => {
      res.send(`${url}`);
      console.log(txn)

  });  

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
                    var boss = req.body.boss;
                    var employee = req.body.employee;
                    var position = req.body.position;

    connection.query("insert into msg(boss,employee,position,uploadFile) values(?,?,?,?)",[boss,employee,position,uploadFile],function(err,results,fields){
      if(err) throw err;
      	               
      console.log("DB success","BOSS---------",boss)
      console.log("DB success","EMPLOYEE-----",employee)
      console.log("DB success","EMPLOYEE-----",position)
      console.log("DB success","IPFS HASH----------",uploadFile)
    })
               })
              }
           });

module.exports = router;

