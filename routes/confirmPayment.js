var express = require('express');
var router = express.Router();
var Web3 = require("web3");
const web3 = new Web3('http://localhost:8545');



router.post('/', function (req, res, next) {
      reqData = req.body;
      console.log("DATA",reqData);


      amountver = req.body.amt;
      console.log("AMOUNT ",amountver)

      boss=req.body.boss;
      console.log("boss",boss);

      MyContract.methods.confirmPayment().send({ from: boss, gas: 6000000, value: web3.utils.toWei(amountver, 'ether') }).on('transactionHash', (hash) => {

        console.log("............ConfirmPayment.............. ",hash);

    
            res.send("............ConfirmPayment.............. ");
          }).on('error', (error) => {
            console.log(error.message);
            res.send("Your action is not valid")
          });
        });
        module.exports = router;
        
        
        