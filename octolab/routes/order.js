const express = require('express');
const multer = require('multer');
const {ensureAuthenticated} = require('../helpers/auth');
const {savedImage, deleteImage} = require('../helpers/helper');
const Order = require('../models/order');

const router = express.Router();

router.get('/confirm', ensureAuthenticated, (req, res) => {
    res.render('order/confirm', {layout: 'user.dashboard.handlebars'});
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('order/add', {layout: 'user.dashboard.handlebars'});
});

module.exports = router;
