var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');

/* GET users listing. */
router.get('/', function (req, res, next) {
  data = req.query;
  console.log(data);
  MyContract.methods.viewDetailsbyemp(data.employeeAdrs)
    .call({ from: accountAddress })
    .then((result) => {
      console.log(result);
      res.render("employeejobView", { result: result, employeeAdrs : data.employeeAdrs });
    })
});


var express = require('express');
var router = express.Router();
var ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})


router.get('/', function (req, res, next) {
    data = req.query;
    console.log(data);

    _url=req.body._url;
    console.log(_url);

    MyContract.methods.viewDetailsbyemp(data.id)
        .call({ from: accountAddress }).then((txn) => {
            console.log("<=====HASH OF IPFS=====>",txn);

            res.render("event", {mydata :_url});
        })
});

module.exports = router;
