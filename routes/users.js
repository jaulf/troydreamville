const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const auth = require('../config/auth');

// Login Page
router.get('/login', auth.forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', auth.forwardAuthenticated, (req, res) => res.render('register'));

//register handle
 
router.post('/register', (req, res) => {

    const { name, email, number, password, password2} = req.body;
    let errors = [];
    let nad = [];

      if(!name) {
          errors.push({msgn : 'Required'})
      }

      if(!email) {
        errors.push({msgea : 'Email is Required'})
      }

      if(!number) {
        errors.push({msgpn : 'Phone number is required'})
      }

      if(!password) {
        errors.push({msgp :  'Password is Required'})
      }

      if(!password2) {
        errors.push({msgcp : 'Required'})
      }

      if (password != password2) {
          nad.push({ msg: 'Passwords do not match' });
        }
    
      if (password != ''  && password.length < 6) {
        nad.push({ msg: 'Password must be at least 6 characters' });
      }
    
      if (errors.length > 0) {
        res.render('register', {
          errors,
          nad,
          name,
          email,
          number,
          password,
          password2
        });
      } else {

        User.findOne({email: email})
          .then(user => {
            if (user) {
              nad.push({ msg: 'Email already exists' });
               res.render('register', {
                errors,
                nad,
                name,
                number,
                email,
                password,
                password2
              });
            } else {
              const newUser = new User({
                name,
                number,
                email,
                password
              });

              
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dash/html',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', auth.ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;