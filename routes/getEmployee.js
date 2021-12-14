var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');

/* GET users listing. */
router.get('/', function (req, res, next) {
  data = req.query;
  console.log(data);
  MyContract.methods.getEmployee(data.empid)
    .call({ from: accountAddress })
    .then((result) => {
      console.log(result);
      res.render("employeeView", { result: result, empid : data.empid });
    })
});



router.post('/', function (req, res, next) {

  const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

  uid = req.body.empidurl;
  myFileBuffer = req.files.uploadFile.data;
  console.log(myFileBuffer);
  ipfs.files.add(myFileBuffer, function (err, file) {
    if (err) throw err;

    let url = `https://ipfs.io/ipfs/${file[0].hash}`;
    console.log(`Url --> ${url}`);

    MyContract.methods.setIfpsUrl(uid,file[0].hash)
    .send({from:accountAddress})
    
    .then((txn) => {
        res.redirect("getEmployee?empid="+uid);
    });
  });
});

module.exports = router;



