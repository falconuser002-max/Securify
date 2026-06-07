const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'XAF' // Central African CFA franc for Cameroon
  },
  plan: {
    type: String,
    enum: ['starter', 'professional', 'enterprise'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  paymentMethod: {
    type: String,
    enum: ['orange_money', 'credit_card', 'bank_transfer'],
    default: 'orange_money'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  errorMessage: String,
  receipientEmail: String,
  billingDetails: {
    fullName: String,
    email: String,
    country: String,
    city: String
  },
  metadata: {
    ipAddress: String,
    userAgent: String
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
