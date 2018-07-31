const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect dashboard.
        res.redirect('/');
    }
);

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/auth/signup',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
