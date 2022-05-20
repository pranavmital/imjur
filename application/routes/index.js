var express = require('express');
var router = express.Router();

const { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware');

var db = require("../config/database");

var {userIsLoggedIn} = require('../middleware/routeprotectors');

/* GET home page. */
router.get('/', getRecentPosts,function(req, res, next) {
  res.render('index', { title: "Pranav's CSC 317 App" });
});

router.use('/login', (req, res, next) => {
  if(/*isLoggedin*/false){
    res.render('dashboard')
  } else{
      next();
  }
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: "Login"});
});

router.get('/register', (req, res, next) => {
  res.render('register', {title: "Register"});
});

// implemented route protection for the /postimage path
router.use('/postimage', userIsLoggedIn);

router.get('/postimage', (req, res, next) => {
  res.render('postimage', {title: "Post an Image"});
});


router.get("/post/:id(\\d+)", getPostById, getCommentsByPostId, (req, res, next) => {
 
  res.render('viewpost',{title: "Detail View - Post"});

});

module.exports = router;
