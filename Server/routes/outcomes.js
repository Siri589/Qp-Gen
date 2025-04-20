const express = require('express');
const router = express.Router();
const { createOutcome, getOutcomes, getOutcome, updateOutcome, deleteOutcome } = require('../controllers/outcomeController');
const auth = require('../middleware/auth');

// Create outcome
router.post('/', auth, createOutcome);

// Get all outcomes
router.get('/', auth, getOutcomes);

// Get single outcome
router.get('/:id', auth, getOutcome);

// Update outcome
router.put('/:id', auth, updateOutcome);

// Delete outcome
router.delete('/:id', auth, deleteOutcome);

module.exports = router;