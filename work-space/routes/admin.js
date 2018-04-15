// import dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router();

// router
router.get('/signin', function(req, res, next) {
    let messages = req.flash('error');
    res.render('admin/signin', {messages: messages, hasErrorrs: messages.length > 0});
});

router.post(
    '/signin',
    passport.authenticate(
        'admin.local.signin', // nama strategi yang didefinisikan dalam passport.js
        {
            // konfigurasi
            failureRedirect: '/admin/signin',
            failureFlash: true
        }
    ),
    function(req, res, next) {
        res.redirect('/'); // /admin/dashboard
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
