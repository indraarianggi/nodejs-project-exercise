const express = require('express');


const router = express.Router();

router.get('/profile', (req, res) => {
    res.render('user/profile', {layout: 'user.dashboard.handlebars'});
});

router.get('/order', (req, res) => {
    res.render('user/order', {layout: 'user.dashboard.handlebars'});
});

router.get('/confirm', (req, res) => {
    res.render('user/confirm', {layout: 'user.dashboard.handlebars'});
});

module.exports = router;

