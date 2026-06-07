const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  scanDate: Date,
  fraudScore: {
    type: Number,
    min: 0,
    max: 100
  },
  isLegit: {
    type: Boolean,
    default: null
  },
  verdict: {
    type: String,
    enum: ['DOCUMENT APPEARS LEGITIMATE', 'POTENTIAL FRAUD DETECTED', 'PENDING'],
    default: 'PENDING'
  },
  analysis: {
    fontConsistency: Boolean,
    layoutFormatting: Boolean,
    securityFeatures: Boolean,
    contentCoherence: Boolean,
    issuerLegitimacy: Boolean,
    imageIntegrity: Boolean,
    metadataValidation: Boolean,
    patternMatching: Boolean
  },
  documentType: {
    type: String,
    enum: ['passport', 'national-id', 'driver-license', 'visa', 'certificate', 'other'],
    default: 'other'
  },
  scanStatus: {
    type: String,
    enum: ['completed', 'processing', 'failed'],
    default: 'processing'
  },
  notes: String,
  archived: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Document', DocumentSchema);
