const express = require('express');

const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/create-checkout-session/', stripeController.stripeCheckout);
router.post('/save-transaction-details/', stripeController.saveTransactionDetails);

module.exports = router;