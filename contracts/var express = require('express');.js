var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var ipfsAPI = require('ipfs-api');


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

  var boss = req.body.boss;
  var employee = req.body.employee;
var uploadFile = req.body.uploadFile;

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

    data = req.body;
   // uid = req.body.id;

   myFileBuffer = req.files.uploadFile.data;
   console.log(myFileBuffer);
   ipfs.files.add(myFileBuffer, function (err, file) {
     if (err) throw err;
 
     let url = `https://ipfs.io/ipfs/${file[0].hash}`;
     console.log(`Url --> ${url}`);

     res.send(`IPFS HASH OF PDF ----- ${url}`);

    console.log(data);
    MyContract.methods.sendmsgtoboss(data.boss,data.employee,file[0].hash) .send({ from: coinbase, gas : 6000000 })
    

    console.log("<====Console Success====>")

    });

    connection.query("insert into msg(boss,employee,uploadFile) values(?,?,?)",[boss,employee,uploadFile],function(err,results,fields){
      if(err) throw err;
      else{
      // res.render("index.ejs");
      console.log("My name is JOMOL JAISON")
      
      }
   });


});

 

module.exports = router;

