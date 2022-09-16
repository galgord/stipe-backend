var express = require('express');
var router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', function (req, res, next) {
  res.json({ Alive: true });
});
router.get('/publishable-key', async (req, res) => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  res.send({ publishableKey });
});
router.post('/create-customer', async (req, res) => {
  const { name, email, phone, address, payment_method } = req.body;
  const { line1, city, state, country, postal_code } = address;
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create({
    name,
    email,
    phone,
    address: {
      line1,
      postal_code,
      city,
      state,
      country,
    },
    payment_method,
  });
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-08-01' }
  );

  res.json({
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
router.post('/create-payment-card', async (req, res) => {
  const { number, exp_month, exp_year, cvc } = req.body;
  // Use an existing Customer ID if this is a returning customer.
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number,
      exp_month,
      exp_year,
      cvc,
    },
  });

  res.json({
    paymentMethod,
  });
});

module.exports = router;
