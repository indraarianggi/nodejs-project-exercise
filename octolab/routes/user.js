const express = require('express');
const passport = require('passport');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const {savedImage, deleteImage} = require('../helpers/helper');
const User = require('../models/user');
const Order = require('../models/order');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination : 'public/images/user_image',
    filename    : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const uploader = multer({storage});

router.get('/google', ensureGuest, passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect dashboard.
        res.redirect('/user/profile');
    }
);

router.get('/login', ensureGuest, (req, res) => {
    res.render('user/login'); //, {message: req.flash('error')}
});

router.get('/signup', ensureGuest, (req, res) => {
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
    User.findById(req.user.id)
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
                    deleteImage(user.image);
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

router.post('/password/change', ensureAuthenticated, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            bcrypt.compare(req.body.current_password, user.password, (err, isMatch) => {
                if(err) {
                    console.log(err);
                }

                if(isMatch) {
                    // Password match
                    bcrypt.genSalt(0, (err, salt) => {
                        bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                            if(err) {
                                console.log(err);
                            } else {
                                user.password = hash
        
                                user.save()
                                    .then(user => {
                                        req.flash('success', 'Password changed successfully.');
                                        res.redirect('/user/profile');
                                    });
                            }
                        });
                    });
                } else {
                    // Password did not match
                    req.flash('error', 'Failed to change password. The current password you entered is incorrect.');
                    res.redirect('/user/profile');
                }
            });
        });
});

router.get('/order', ensureAuthenticated, (req, res) => {
    Order.find({user: req.user.id})
        .then(orders => {
            res.render('user/order', {
                orders: orders,
                layout: 'user.dashboard.handlebars'
            });
        });
});

router.get('/hitung', (req, res) => {
    let a = 1, b = 2, c;
    console.log(a);
    console.log(b);
    for(i=1; i<= 10; i++) {
        c = a + b;
        console.log(c);
        
        a = b;
        b = c;
    }

    res.redirect('/');
});

router.get('/kame', (req, res) => {
    
    n = 7;

    prefix = ['k', 'm', 'h', 'm', 'h'];
    m = prefix.length;

    let yel = '';
    for(i=0;i<m;i++) {
        yel += ` ${prefix[i]}`;
        
        for(j=0;j<n;j++) {
            if(i%2 == 1) {
                yel += 'e';
            } else {
                yel += 'a';
            }
        }
    }

    console.log(yel);


    // console.log('k');

    // for(i=1;i<=4;i++) {
    //     console.log('a');
    // }

    // console.log('m');

    // for(i=1;i<=4;i++) {
    //     console.log('e');
    // }

    // console.log('h')

    // for(i=1;i<=4;i++) {
    //     console.log('a');
    // }

    // console.log('m')

    // for(i=1;i<=4;i++) {
    //     console.log('e');
    // }

    // console.log('h')

    // for(i=1;i<=4;i++) {
    //     console.log('a');
    // }

    res.redirect('/');
});



module.exports = router;
