var express = require('express');
var Cart = require('../models/cart');

var router = express.Router();

var Product = require('../models/product');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err, data) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i=0; i<data.length; i+=chunkSize) {
      productChunks.push(data.slice(i, i+chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) { 
      console.log(err);
      return res.redirect('/user/signin'); 
    }
    
    cart.add(product, product.id);
    req.session.cart = cart;

    console.log(req.session.cart);

    res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
  if(!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }

  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }

  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {totalPrice: cart.totalPrice});
});

router.post('/checkout', function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }

  var cart = new Cart(req.session.cart);

  // create order...
  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name
  });
  // ...and save to database
  order.save((err, result) => {
    if (err) { return res.redirect('/checkout'); }
    
    req.session.cart = null;
    res.redirect('/');
  })
});


module.exports = router;
