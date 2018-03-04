// BASE SETUP
// =============================================================================
// memanggil semua package yang dibutuhkan
var express = require('express');
var app = express();                        // mendefinisikan app menggunakan express
var bodyParser = require('body-parser');

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

router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});


// register routes
// semua route (url) akan diawali dengan /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Server start at port ${port}`);
