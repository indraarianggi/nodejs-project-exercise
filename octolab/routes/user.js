const express = require('express');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const {ensureAuthenticated} = require('../helpers/auth');
const {savedImage} = require('../helpers/helper');
const User = require('../models/user');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination : 'public/images/user_image',
    filename    : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const uploader = multer({storage});

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

router.post('/profile/update', ensureAuthenticated, uploader.single('image'), (req, res) => {
    User.findOne({_id: req.user.id})
        .then(user => {
            // new value
            user.name       = req.body.name;
            user.email      = req.body.email;
            user.telephone  = req.body.telephone;
            user.instagram  = req.body.instagram;
            
            let address = {
                address : req.body.address,
                city: req.body.city,
                province: req.body.province,
                postal_code: req.body.postal_code,
                state   : req.body.state
            }

            user.address = address;

            let image = '';
            // Jika upload image baru
            if(req.file) {
                // jika sebelumnya ada user image
                if(user.image) {
                    // Hapus image di folder public/images/user_image
                    let imagePath = `public${user.image}`;
                    fs.unlink(imagePath, function(err) {
                        if(err) throw err;
                    });
                }

                image = savedImage(req.file.path);
                user.image = image;
                
            }

            console.log(`New image ${user.image}`);

            user.save()
                .then(user => {
                    req.flash('success', 'User profile updated successfully.');
                    res.redirect('/user/profile');
                });
        });
});

router.get('/order', ensureAuthenticated, (req, res) => {
    res.render('user/order', {layout: 'user.dashboard.handlebars'});
});

router.get('/confirm', ensureAuthenticated, (req, res) => {
    res.render('user/confirm', {layout: 'user.dashboard.handlebars'});
});

module.exports = router;

