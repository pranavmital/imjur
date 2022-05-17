var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Pranav Mital" });
});

router.use('/login', (req, res, next) => {
  if(/*isLoggedin*/false){
    res.render('dashboard')
  } else{
      next();
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/postimage', (req, res, next) => {
  res.render('postimage')
});

module.exports = router;
