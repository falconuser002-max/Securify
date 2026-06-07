const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['inactive', 'active', 'expired'],
      default: 'inactive'
    },
    startDate: Date,
    endDate: Date,
    scansRemaining: {
      type: Number,
      default: 10
    },
    totalScansUsed: {
      type: Number,
      default: 0
    }
  },
  profile: {
    fullName: String,
    company: String,
    phone: String,
    country: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', UserSchema);
