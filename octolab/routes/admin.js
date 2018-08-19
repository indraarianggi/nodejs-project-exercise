const express = require('express');
const passport = require('passport');
const multer = require('multer');
const {ensureAdmin, ensureAdminLogged} = require('../helpers/auth');
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

router.get('/login', ensureAdminLogged, (req, res) => {
    res.render('admin/login', {layout: false});
});

router.get('/signup', ensureAdminLogged, (req, res) => {
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

router.get('/overview', ensureAdmin, (req, res) => {

    User.countDocuments({role: 'user'}, function(err, nu) {
        let numUser = nu;

        Order.countDocuments({status: 0}, function(err, nio) {
             let numIncomingOrder = nio;

             Order.countDocuments({status: {'$gte': 5}}, function(err, nfo) {
                 let numFinishedOrder = nfo;

                 res.render('admin/overview', {
                     numUser            : numUser,
                     numIncomingOrder   : numIncomingOrder,
                     numFinishedOrder   : numFinishedOrder,
                     layout             : 'admin.dashboard.handlebars'
                    });
             });
        });
    });
});

router.get('/order/:criteria?', (req, res) => { //ensureAdmin
    if(req.params.criteria == 0) {
        Order.find({status: 0})
            .populate('user')
            .then(orders => {
                res.render('admin/order', {
                    orders  : orders,
                    layout  : 'admin.dashboard.handlebars'
                });
            });
    } else if(req.params.criteria == 5) {
        Order.find({status: {'$gte': 5}})
            .populate('user')
            .then(orders => {
                res.render('admin/order', {
                    orders  : orders,
                    layout  : 'admin.dashboard.handlebars'
                });
            });
    } else {
        Order.find()
            .populate('user')
            .then(orders => {
                res.render('admin/order', {
                    orders  : orders,
                    layout  : 'admin.dashboard.handlebars'
                });
            });
    }
});

module.exports = router;
