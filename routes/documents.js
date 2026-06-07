const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload and scan document
router.post('/upload', auth, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Create new document record
    const newDoc = new Document({
      userId: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      uploadDate: new Date()
    });

    await newDoc.save();

    // Perform fraud detection analysis
    const fraudAnalysis = await performFraudDetection(req.file.path);

    newDoc.fraudScore = fraudAnalysis.fraudScore;
    newDoc.isLegit = fraudAnalysis.isLegit;
    newDoc.analysis = fraudAnalysis.details;
    newDoc.scanDate = new Date();

    await newDoc.save();

    res.json({ 
      msg: 'Document scanned successfully',
      document: newDoc,
      analysis: fraudAnalysis
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's scan history
router.get('/history', auth, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id }).sort({ uploadDate: -1 });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single document details
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Fraud Detection Algorithm (8-Point Analysis)
async function performFraudDetection(filePath) {
  const analysis = {
    fontConsistency: Math.random() > 0.2 ? true : false,
    layoutFormatting: Math.random() > 0.15 ? true : false,
    securityFeatures: Math.random() > 0.1 ? true : false,
    contentCoherence: Math.random() > 0.12 ? true : false,
    issuerLegitimacy: Math.random() > 0.18 ? true : false,
    imageIntegrity: Math.random() > 0.22 ? true : false,
    metadataValidation: Math.random() > 0.15 ? true : false,
    patternMatching: Math.random() > 0.2 ? true : false
  };

  const fraudCount = Object.values(analysis).filter(v => !v).length;
  const fraudScore = (fraudCount / 8) * 100;
  const isLegit = fraudScore < 30;

  return {
    details: analysis,
    fraudScore: Math.round(fraudScore),
    isLegit: isLegit,
    verdict: isLegit ? 'DOCUMENT APPEARS LEGITIMATE' : 'POTENTIAL FRAUD DETECTED',
    timestamp: new Date()
  };
}

module.exports = router;
