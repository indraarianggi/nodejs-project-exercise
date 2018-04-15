// import dependencies
const passport = require('passport');
const User = require('../models/user');
const Admin = require('../models/admin');
const LocalStrategy = require('passport-local').Strategy;

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
        req.checkBody('name', 'Nama tidak boleh kosong').notEmpty();
        req.checkBody('gender', 'Jenis kelamin tidak boleh kosong').notEmpty();
        req.checkBody('address', 'Alamat tidak boleh kosong').notEmpty();
        req.checkBody('phone_number', 'Nomor tidak boleh kosong dan dalam format yang benar').notEmpty().isNumeric();
        req.checkBody('email', 'Email tidak boleh kosong dan dalam format yang benar').notEmpty().isEmail();
        req.checkBody('password', 'Password tidak boleh kosong dan minimal 5 karakter').notEmpty().isLength({min:5});
        let errors = req.validationErrors();
        if (errors) {
            let messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        // mencari apakah email yang diinputkan sudah digunakan user lain
        User.findOne({'email': email}, (err, user) => {
            if (err) {
                // tidak ada user dengan email yang diinputkan
                return done(err);
            }
            if (user) {
                // sudah ada user dengan email yang diinputkan
                return done(null, false, {message: "Email sudah digunakan oleh user lain"});
            }

            // jika tidak error dan belum ada data dengan email yang diinputkan
            // buat user baru
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.birth_date = req.body.birth_date;
            newUser.gender = req.body.gender;
            newUser.address = req.body.address;
            newUser.phone_number = req.body.phone_number;
            newUser.job = req.body.job;
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            // newUser.profile_pict = req.body.profile_pict; BELUM
            newUser.registered_date = new Date();

            // simpan user baru
            newUser.save((err, result) => {
                if (err) return done(err);

                return done(null, newUser);
            });
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
        req.checkBody('email', 'Email tidak boleh kosong dan dalam format yang benar').notEmpty().isEmail();
        req.checkBody('password', 'Password tidak boleh kosong').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        // mencari data user
        User.findOne({'email': email}, (err, user) => {
            // jika error
            if (err) return done(err);

            // jika user tidak ditemukan dalam database
            if (!user) return done(null, false, {message: `User dengan email ${email} tidak ditemukan.`});

            // jika password tidak sesuai
            if (!user.validPassword(password)) return done(null, false, {message: 'Email dan password tidak sesuai.'});

            // email dan password sesuai
            // signin berhasil
            return done(null, user);
        });
    }
));


// strategy for admin signin
passport.use('admin.local.signin', new LocalStrategy(
    {
        // konfigurasi strategi
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // validasi
        req.checkBody('email', 'Email tidak boleh kosong dan dalam format yang benar').notEmpty().isEmail();
        req.checkBody('password', 'Password tidak boleh kosong').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        // mencari data user
        Admin.findOne({'email': email}, (err, admin) => {
            // jika error
            if (err) return done(err);

            // jika user tidak ditemukan dalam database
            if (!admin) return done(null, false, {message: `Admin dengan email ${email} tidak ditemukan.`});

            // jika password tidak sesuai
            if (!admin.validPassword(password)) return done(null, false, {message: 'Email dan password tidak sesuai.'});

            // email dan password sesuai
            // signin berhasil
            return done(null, admin);
        });
    }
))
