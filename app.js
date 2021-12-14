var createError = require('http-errors');
var express = require('express');
var path            = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');
var validator = require('express-validator');

var fileUpload = require('express-fileupload');

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})


var Web3 = require("web3");

const app = express()
var multer  = require('multer');

const fs =require('fs');

var mysql = require('mysql');
const ejs = require('ejs');

const encoder = bodyParser.urlencoded();

//-----------------------------------------------------




////////////////////////////////////////////////////////



//-------------------------------------------------------



var addjob = require('./routes/addjob');
var applyjobRouter = require("./routes/apply");

var escrowRouter = require('./routes/escrow');

var getEmployee = require("./routes/getEmployee");

var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout');
var login=require('./routes/login')
var managerviewRouter = require("./routes/managerview");

// var usersRouter = require('./routes/users');
var searchEmployeeRouter= require("./routes/searchEmployee");
var searchjobRouter = require("./routes/searchjob");

var searchPerRouter= require("./routes/searchPer");
var searchPerjobRouter= require("./routes/searchPerjob");
var setEmployee = require("./routes/setEmployee");
var setUser = require("./routes/setUser");
var viewDetailsbyemp = require("./routes/viewDetailsbyemp");

var viewjobRouter = require("./routes/viewjob");
var viewempRouter = require("./routes/viewemp");
var searchempRouter = require("./routes/searchemp");
var sendjobRouter = require("./routes/send");
var sendmsgtobossRouter = require("./routes/sendmsgtoboss");
var createInvoiceToempAddressRouter = require("./routes/createInvoiceToempAddress");
var managerview1Router = require("./routes/managerview");
var ipfsRouter = require("./routes/getEmployee");

var createworkRouter = require('./routes/creatework');
//var getPdfRouter=require('./routes/getPdf');
 var confirmDeliveryRouter=require('./routes/confirmDelivery');
 var confirmPaymentRouter=require('./routes/confirmPayment')




var edit = require("./routes/edit");


//-------------------WEB3 Integration starts-----------------------

var MyContractJSON  = require(path.join(__dirname, 'build/contracts/esrowboss.json'));
var Web3 = require("web3");
const web3 = new Web3('http://localhost:7545');
accountAddress = ""; //Ganache
const contractAddress = MyContractJSON.networks['5777'].address;
const contractAbi = MyContractJSON.abi;

MyContract = new web3.eth.Contract(contractAbi, contractAddress);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(validator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/escrow', escrowRouter);

app.use('/search', searchEmployeeRouter);
app.use('/searchPer', searchPerRouter);
app.use('/searchPerjob', searchPerjobRouter);
app.use('/setEmployee', setEmployee);
app.use('/whitelistAddress', setUser);
app.use('/getEmployee', getEmployee);
app.use('/viewDetailsbyemp', viewDetailsbyemp);

app.use('/addjob',addjob);
app.use('/viewjob',viewjobRouter);
app.use('/viewemp',viewempRouter);
app.use('/searchjob',searchjobRouter);
app.use('/searchemp',searchempRouter);
app.use('/apply',applyjobRouter);
app.use('/send',sendjobRouter);
app.use('/sendmsgtoboss',sendmsgtobossRouter);
app.use('/createInvoiceToempAddress',createInvoiceToempAddressRouter);

app.use('/creatework',createworkRouter);
//app.use('/getPdf',getPdfRouter);
 app.use('/confirmDelivery',confirmDeliveryRouter);
 app.use('/confirmPayment',confirmPaymentRouter);


app.use('/managerview',managerviewRouter);
app.use('/managerview',managerview1Router);

app.use('/ipfs',ipfsRouter);
// app.use('/register',registerRouter);
app.use('/edit',edit);
app.use('/login',login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// app.get('/download/:ID',function(req,res){
//   console.log(req.params.ID);
//   res.redirect('https://ipfs.io/ipfs/'+req.params.ID);
// })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
