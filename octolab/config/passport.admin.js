const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {savedImage, deleteImage} = require('../helpers/helper');
const Admin = require('../models/admin');

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

    Admin.findOne({email: email})
        .then(admin => {
            // admin already exist
            if(admin) {
                // hapus image yang sudah terlanjur terupload
                deleteImage(image);
                return done(null, false, {message: `Admin with email ${email} already exist.`});
            }

            // Create new admin
            const newAdmin = {
                name    : req.body.name,
                email   : email,
                image   : image
            }

            bcrypt.genSalt(0, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        console.log(err);
                    } else {
                        newAdmin.password = hash

                        new Admin(newAdmin)
                            .save()
                            .then(admin => done(null, admin));
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
    Admin.findOne({email: email})
        .then(admin => {
            if(!admin) {
                return done(null, false, {message: `Admin with email ${email} not found.`});
            }

            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if(err) {
                    console.log(err);
                }

                if(isMatch) {
                    // Admin exist and password match
                    return done(null, admin);
                } else {
                    // Password did not match
                    return done(null, false, {message: 'Password did not match.'});
                }
            });
        });
}));

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id)
        .then(admin => done(null, admin));
});
