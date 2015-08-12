var express = require('express');
var router = express.Router();
var connection = require('../connection');

var signup_error = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' , error : signup_error});
});

router.get('/signup', function(req, res, next) {
  res.render('index', { title: 'SignUp'});
});

router.post('/login', function(req, res, next) {
  var email = req.body.inputEmail;
  var pass = req.body.inputPassword;
  connection.query("SELECT * from user where email ='"+ email +"' AND password = '"+ pass+"'", function(err,row,field){
    if(err)
    {
      throw err;
    }
    else
    {
      if(row.length > 0)
      {
        res.redirect('/');
      }
      else
      {
        signup_error = "email or password error";
        res.redirect("/login")
      }
    }
  })
});

router.post('/signup', function(req, res, next) {
  var name = req.body.inputName;
  var phone = req.body.inputPhone;
  var email = req.body.inputEmail;
  var pass = req.body.inputPassword;
  connection.query("INSERT into user(name,phone,email,password) values('"+name+"','"+ phone +"','"+ email +"','"+pass+"')",function(err,row,field){
    if(!err)
    {
      res.redirect("/");
    }
    else
    {
      throw err;
    }

  });
});

module.exports = router;
