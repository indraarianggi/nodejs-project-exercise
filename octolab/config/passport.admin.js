const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {savedImage, deleteImage} = require('../helpers/helper');
const User = require('../models/user');

// Local Strategy - Admin Signup
passport.use('admin.signup', new LocalStrategy({
    // configuration
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    let image = savedImage(req.file.path);

    if(req.body.password != req.body.conf_password) {
        // hapus image yang sudah terlanjur terupload
        deleteImage(image);
        return done(null, false, {message: 'Password did not match.'})
    }

    User.findOne({role: 'admin', email: email})
        .then(user => {
            // user already exist
            if(user) {
                // hapus image yang sudah terlanjur terupload
                deleteImage(image);
                return done(null, false, {message: `Admin with email ${email} already exist.`});
            }

            // Create new admin
            const newUser = {
                role    : 'admin',
                name    : req.body.name,
                email   : email,
                image   : image
            }

            bcrypt.genSalt(0, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        console.log(err);
                    } else {
                        newUser.password = hash

                        new User(newUser)
                            .save()
                            .then(user => done(null, user));
                    }
                });
            });
        });
}));

// Local Strategy - Admin Log In
passport.use('admin.login', new LocalStrategy({
    // configuration
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({role: 'admin', email: email})
        .then(user => {
            if(!user) {
                return done(null, false, {message: `Admin with email ${email} not found.`});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    console.log(err);
                }

                if(isMatch) {
                    // Admin exist and password match
                    return done(null, user);
                } else {
                    // Password did not match
                    return done(null, false, {message: 'Password did not match.'});
                }
            });
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id)
        .then(user => done(null, user));
});
