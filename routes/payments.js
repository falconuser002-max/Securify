const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');
const axios = require('axios');

// Initiate Orange Money payment
router.post('/initiate', auth, async (req, res) => {
  try {
    const { amount, plan, phoneNumber } = req.body;

    if (!amount || !plan || !phoneNumber) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Create payment record
    const payment = new Payment({
      userId: req.user.id,
      amount: amount,
      plan: plan,
      phoneNumber: phoneNumber,
      status: 'pending',
      createdAt: new Date()
    });

    await payment.save();

    // Call Orange Money API
    try {
      const orangeResponse = await initiateOrangeMoneyPayment({
        amount: amount,
        phoneNumber: phoneNumber,
        merchantId: process.env.ORANGE_MONEY_MERCHANT_ID,
        transactionId: payment._id.toString(),
        description: `Securify ${plan} Plan`
      });

      payment.transactionId = orangeResponse.transactionId;
      await payment.save();

      res.json({
        msg: 'Payment initiated',
        paymentId: payment._id,
        transactionId: orangeResponse.transactionId,
        amount: amount,
        status: 'pending'
      });
    } catch (orangeErr) {
      payment.status = 'failed';
      payment.errorMessage = orangeErr.message;
      await payment.save();
      return res.status(500).json({ msg: 'Orange Money API error', error: orangeErr.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Verify Orange Money payment
router.post('/verify/:paymentId', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    if (payment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    // Verify with Orange Money API
    try {
      const verifyResponse = await verifyOrangeMoneyPayment({
        transactionId: payment.transactionId,
        merchantId: process.env.ORANGE_MONEY_MERCHANT_ID
      });

      if (verifyResponse.status === 'success') {
        payment.status = 'completed';
        payment.completedAt = new Date();

        // Update user subscription
        const user = await User.findById(req.user.id);
        user.subscription = {
          plan: payment.plan,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          scansRemaining: getPlanScans(payment.plan),
          status: 'active'
        };

        await user.save();
        await payment.save();

        return res.json({
          msg: 'Payment verified and subscription activated',
          payment: payment,
          subscription: user.subscription
        });
      } else {
        payment.status = 'failed';
        await payment.save();
        return res.status(400).json({ msg: 'Payment verification failed' });
      }
    } catch (verifyErr) {
      return res.status(500).json({ msg: 'Verification error', error: verifyErr.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's payment history
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Orange Money API Integration Functions
async function initiateOrangeMoneyPayment(paymentData) {
  // This is a placeholder - replace with actual Orange Money API endpoint
  const response = await axios.post('https://api.orangemoney.cm/v1/payment/initiate', {
    merchantId: paymentData.merchantId,
    amount: paymentData.amount,
    phoneNumber: paymentData.phoneNumber,
    transactionId: paymentData.transactionId,
    description: paymentData.description,
    apiKey: process.env.ORANGE_MONEY_API_KEY
  });

  return {
    transactionId: response.data.transactionId || paymentData.transactionId,
    status: 'pending'
  };
}

async function verifyOrangeMoneyPayment(verifyData) {
  // This is a placeholder - replace with actual Orange Money API endpoint
  const response = await axios.post('https://api.orangemoney.cm/v1/payment/verify', {
    merchantId: verifyData.merchantId,
    transactionId: verifyData.transactionId,
    apiKey: process.env.ORANGE_MONEY_API_KEY
  });

  return {
    status: response.data.status || 'pending',
    amount: response.data.amount
  };
}

function getPlanScans(plan) {
  const scans = {
    'starter': 10,
    'professional': 100,
    'enterprise': 999999
  };
  return scans[plan] || 10;
}

module.exports = router;
