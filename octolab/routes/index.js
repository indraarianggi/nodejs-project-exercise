const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('index/home');
});

router.get('/gallery', (req, res) => {
    res.render('index/gallery');
});

router.get('/procedure', (req, res) => {
    res.render('index/procedure');
});

router.get('/pricelist', (req, res) => {
    res.render('index/pricelist');
});

module.exports = router;
