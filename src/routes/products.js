const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.post('/product', productsController.createProduct) // create
router.get('/products', productsController.getAllProducts) // read

module.exports = router;