const express = require('express');
const router = express.Router();

const orderController = require('../controller/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get an order
router.get('/:orderId', orderController.getOrder);

module.exports = router;