// BASE SETUP
// =============================================================================
// memanggil semua package yang dibutuhkan
var express = require('express');
var app = express();                        // mendefinisikan app menggunakan express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/bear');

// koneksi ke mongodb database lokal
mongoose.connect('mongodb://localhost/beardb');

// konfigurasi app untuk menggunakan body-parser
// ini mengijinkan untuk mendapatkan data dari metode POST
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// set port
var port = process.env.PORT || 3000;


// ROUTES FOR API
// =============================================================================
// instance dari express Router
var router = express.Router();

// minddleware yang digunakan untuk semua request
router.use((req, res, next) => {
    console.log('Somethis is happening.');
    next(); // ke router selanjutnya, tidak berhenti disini
})

router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// routes yang berakhiran /bears
// ----------------------------------------------------
router.route('/bears')              // menangani multiple route untuk URI yang sama

    // membuat bear baru (akses POST ke http://localhost:3000/api/bears)
    .post((req, res) => {
        var bear = new Bear();      // membuat instance baru dari model Bear
        bear.name = req.body.name;  // set nama bear dari request yang masuk

        // simpan bear
        bear.save((err) => {
            if (err) res.send(err);

            res.json({ message: 'Bear created!'} );
        });
    })

    // mendapatkan semua bear (akses GET ke http://localhost:3000/api/bears)
    .get((req, res) => {
        Bear.find((err, data) => {
            if (err) res.send(err);

            res.json(data);
        });
    });


// routes yang berakhiran /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // mendapatkan bear dengan id tertentu (akses GET ke http://localhost:3000/api/bears/:bear_id)
    .get((req, res) => {
        Bear.findById(req.params.bear_id, (err, data) => {
            if (err) res.send(err);

            res.json(data);
        });
    })

    // update bear (akses PUT ke http://localhost:3000/api/bears/:bear_id)
    .put((req, res) => {
        // cari bear berdasarkan id
        Bear.findById(req.params.bear_id, (err, data) => {
            if (err) res.send(err);

            data.name = req.body.name   // update dengan nama baru
            // simpan bear
            data.save((err) => {
                if (err) res.send(err);

                res.json({ message:'Bear updated!'} );
            });
        });
    })

    // hapus bear (akses DELETE ke http://localhost:3000/api/bears/:bear_id)
    .delete((req, res) => {
        Bear.remove(
            { _id: req.params.bear_id },    // kriteria data yang dihapus (berdasarkan id)
            (err, data) => {
                if (err) res.send(err);

                res.json({ message:`Successfully delete ${req.params.bear_id}!`})
            }
        );
    });


// register routes
// semua route (url) akan diawali dengan /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Server start at port ${port}`);
