var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

// save session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// strategy for signup
passport.use('local.signup', new LocalStrategy(
    {
        // konfigurasi strategi
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // validasi
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        // mencari apakah data yang diinputkan sudah ada
        User.findOne({'email': email}, (err, user) => {
            if (err) {
                // jika error
                return done(err);
            }
            if (user) {
                // jika sudah ada data dengan email yang diinputkan
                return done(null, false, {message: 'Email is already in use.'});
            }

            // jika tidak error dan belum ada data dengan email yang diinputkan
            // buat user baru
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            // simpan user baru
            newUser.save((err, result) => {
                if (err) { return done(err); }

                return done(null, newUser);
            })
        });
    }
));

// strategy for signin
passport.use('local.signin', new LocalStrategy(
    {
        // konfigurasi strategi
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // validasi
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        // mencari apakah data yang diinputkan sudah ada
        User.findOne({'email': email}, (err, user) => {
            if (err) {
                // jika error
                return done(err);
            }
            if (!user) {
                // jika user tidak ditemukan dalam database
                return done(null, false, {message: 'No user found.'});
            }
            if (!user.validPassword(password)) {
                // jika password tidak cocok
                return done(null, false, {message: 'Wrong password.'});
            }

            // jika email dan password cocok
            // signin berhasil
            return done(null, user);
            
        });
    }
));