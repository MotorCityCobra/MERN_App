const express = require("express");
const router = express.Router();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_UVaDS9rlh3rOHOA4LnadJjTf00RnwHi7Qs");
router.use(express.static("."));
router.use(express.json());
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
router.post("/", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  console.log('wertwetr')
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});
// router.listen(4242, () => console.log('Node server listening on port 4242!'));

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_UVaDS9rlh3rOHOA4LnadJjTf00RnwHi7Qs')

// router.get('/', async (req, res) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'usd',
//     // Verify your integration in this guide by including this parameter
//     metadata: {integration_check: 'accept_a_payment'},
//   });  res.json({client_secret: intent.client_secret});
// });
// module.exports = router;
