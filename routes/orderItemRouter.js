const express = require('express');
const router = express.Router();

const orderItemController = require('../controller/orderItemController');

router.post('/', orderItemController.createOrderItem);

module.exports = router;