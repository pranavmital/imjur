var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require("../models/Users")
var bcrypt = require('bcrypt');


const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ message: 'respond with a resource' });
});


// localhost:3000/users/login
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  /* Do server side validation here */
  // about to do server side validation



  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success', 'You have sucessfully logged in!');
        res.redirect('/');
      } else {
        throw new UserError("Invalid username and/or password!", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login')
      } else {
        next(err);
      }
    });

});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  // server side validation code begins

  // Creating RegEx to check for presence of uppercase, numerical, and special character
  let check_forUppercase = new RegExp("^(?=.*[A-Z])")
  let check_forNumber = new RegExp("^(?=.*\\d)")
  let check_forSpecialChar = new RegExp("^(?=.*[-+_!@#$%^&*., ?])")

  // validate username
  if (username.length < 3) {
    req.flash('error', 'Your username must be at least 3 alphanumeric characters long!');
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (!((/[a-zA-Z]/).test(username.charAt(0)))) {
    req.flash('error', 'Your username must begin with a character! (a-z or A-Z)');
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (password.length < 8) {
    req.flash('error', 'Your password must be at least 8 characters long!');
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (!(check_forUppercase.test(password))) {
    req.flash('error', 'Your password must contain at least one uppercase character!')
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (!(check_forNumber.test(password))) {
    req.flash('error', 'Your password must contain at least one number!')
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (!(check_forSpecialChar.test(password))) {
    req.flash('error', 'Your password must contain at least one special character!')
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (!(password == cpassword)) {
    req.flash('error', 'Passwords do not match!');
    req.session.save(err => {
      res.redirect('/register');
    })
  } else {

    UserModel.usernameExists(username)
      .then((usernameDoesExist) => {
        if (usernameDoesExist) {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/register",
            200
          );
        } else {
          return UserModel.emailExists(email);
        }
      })
      .then((emailDoesExist) => {
        if (emailDoesExist) {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/register",
            200
          );
        } else {
          return UserModel.create(username, password, email)
        }
      })
      .then((createdUserId) => {
        if (createdUserId < 0) {
          throw new UserError(
            "Serve Error, user could not be created",
            "/register",
            500
          );
        } else {
          successPrint("users.js --> User was created!");
          req.flash('success', "Your account has been created!");
          res.redirect('/login');
        }
      })
      .catch((err) => {
        errorPrint("User could not be made", err);
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          req.flash('error', err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        } else {
          next(err);
        }
      });

  }
})


/*
  return db.execute("SELECT * FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
    if (results && results.length == 0) {
      return db.execute("SELECT * from users WHERE email=?", [email]);
    } else {
      throw new UserError(
        "Registration Failed: Username already exists",
        "/register",
        200
     );
    } 
  })
  .then(([results, fields]) => {
    if (results && results.length == 0) {
      return bcrypt.hash(password, 15);
  } else {
    throw new UserError(
      "Registration Failed: Email already exists",
      "/register",
      200
      );
    }
  }) 
  .then((hashedPassword) => {    
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
      return db.execute(baseSQL, [username, email, hashedPassword]);
  })
  .then(([results, fields]) => {
    if (results && results.affectedRows) {
        successPrint("users.js --> User was created!");
        req.flash('success', "Your account has been created!");
        res.redirect('/login');
    } else {
      throw new UserError(
        "Serve Error, user could not be created",
        "/register",
        500
      );
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });
});
*/

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('Session could not be destroyed.');
      next(err);
    } else {
      successPrint('Session was destroyed.');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "user is logged out" });
    }
  });
});

module.exports = router;