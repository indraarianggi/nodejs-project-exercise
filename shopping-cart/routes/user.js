var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout(); // => method dari passport
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
})

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
  
router.post('/signup', passport.authenticate(
    'local.signup', // nama strategi yang didefinisikan dalam passport.js
    {
      // konfigurasi
      successRedirect: '/user/profile',
      failureRedirect: '/user/signup',
      failureFlash: true
    }
));
  
router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
  
router.post('/signin', passport.authenticate(
    'local.signin', // nama strategi yang didefinisikan dalam passport.js
    {
      // konfigurasi
      successRedirect: '/user/profile',
      failureRedirect: '/user/signin',
      failureFlash: true
    }
));


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { // => method dari passport
        return next();
    }

    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) { // => method dari passport
        return next();
    }

    res.redirect('/');
}
