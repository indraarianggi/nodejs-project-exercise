const express = require('express');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect dashboard.
        res.redirect('/user/profile');
    }
);

router.get('/login', (req, res) => {
    res.render('user/login'); //, {message: req.flash('error')}
});

router.get('/signup', (req, res) => {
    res.render('user/signup'); //, {message: req.flass('error')}
});

router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
    })
);

router.post('/signup', 
    passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('user/profile', {layout: 'user.dashboard.handlebars'});
});

router.get('/order', ensureAuthenticated, (req, res) => {
    res.render('user/order', {layout: 'user.dashboard.handlebars'});
});

router.get('/confirm', ensureAuthenticated, (req, res) => {
    res.render('user/confirm', {layout: 'user.dashboard.handlebars'});
});

module.exports = router;

