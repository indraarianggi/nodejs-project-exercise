const express = require('express');
const passport = require('passport');
const multer = require('multer');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const Admin = require('../models/admin');
const User = require('../models/user');
const Order = require('../models/order');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination : 'public/images/admin_image',
    filename    : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const uploader = multer({storage});

router.get('/login', (req, res) => {
    res.render('admin/login', {layout: false});
});

router.get('/signup', (req, res) => {
    res.render('admin/signup', {layout: false});
});

router.post('/login',
    passport.authenticate('admin.login', {
        successRedirect: '/admin/overview',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
);

router.post('/signup', 
    uploader.single('image'),
    passport.authenticate('admin.signup', {
        successRedirect: '/admin/overview',
        failureRedirect: '/admin/signup',
        failureFlash: true
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/overview', (req, res) => {
    res.send('Admin Overview');
})

module.exports = router;
