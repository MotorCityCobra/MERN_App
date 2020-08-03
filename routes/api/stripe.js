const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const stripe = require('stripe')('sk_test_UVaDS9rlh3rOHOA4LnadJjTf00RnwHi7Qs');

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });  res.json({client_secret: intent.client_secret});
});


module.exports = router;
