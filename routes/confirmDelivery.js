var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var currentAddress = req.body.boss;
    console.log(currentAddress) 
     var employee = req.body.employee;
    console.log(employee)
    
    var filehash=req.body.filehash;
    console.log(filehash);

    MyContract.methods.confirmDelivery().send({ from: boss, gas: 1500000,to: employee})
        .on('receipt', function (receipt) {
            console.log(receipt)
            res.redirect(''+filehash);
            //res.send("<---------------AMOUNT credited--------------------->")
        })
        .on('error', (error) => {
            console.log(error.message);
            res.send("<---------------ACTION failed!!!!!");
        })
});

module.exports = router;