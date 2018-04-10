// import dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router();


// router
router.get('/signout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
    let messages = req.flash('error');
    res.render('pages/signup', {messages: messages, hasErrors: messages.length > 0});
});

router.post(
    '/signup',
    passport.authenticate(
        'local.signup', // nama strategi yang didefinisikan dalam passport.js
        {
            // konfigurasi
            failureRedirect: '/user/signup',
            failureFlash: true
        }
    ),
    function(req, res, next) {
        // if (req.session.oldUrl) {
        //     let oldUrl = req.session.oldUrl;
        //     req.session.oldUrl = null;
        //     res.redirect(oldUrl);
        // } else {
        //     res.redirect('/'); // nanti diganti /user/profile
        // }
        res.redirect('/');
    }
);

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('pages/signin', {messages: messages, hasErrors: messages.length > 0});
});

router.post(
    '/signin',
    passport.authenticate(
        'local.signin', // nama strategi yang didefinisikan dalam passport.js
        {
            // konfigurasi
            failureRedirect: '/user/signin',
            failureFlash:true
        }
    ),
    function(req, res, next) {
        // if (req.session.oldUrl) {
        //     var oldUrl = req.session.oldUrl;
        //     req.session.oldUrl = null;
        //     res.redirect(oldUrl);
        // } else {
        //     res.redirect('/'); // nanti diganti /user/profile
        // }
        res.redirect('/');
    }
);


// export module
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
