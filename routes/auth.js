var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
 
 
//display login page
router.get('/', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('login', {
        title: 'Login',
        email: '',
        password: ''     
    })
})
 
//display login page
router.get('login', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('login', {
        title: 'Login',
        email: '',
        password: ''    
    })
})
 
 
//authenticate user
router.post('/authentication', function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
 
        connection.query('SELECT * FROM employee WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Please correct enter email and Password!')
                res.redirect('login')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                req.session.loggedin = true;
                req.session.name = name;
                res.redirect('home');
 
            }            
        })
  
})
 
 
//display home page
router.get('home', function(req, res, next) {
    if (req.session.loggedin) {
         
        res.render('home', {
            title:"Dashboard",
            name: req.session.name,     
        });
 
    } else {
 
        req.flash('success', 'Please login first!');
        res.redirect('/login');
    }
});
 
// Logout user
router.get('/logout', function (req, res) {
  req.session.destroy();
  req.flash('success', 'Login Again Here');
  res.redirect('/login');
});
 
module.exports = router;