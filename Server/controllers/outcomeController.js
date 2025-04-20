const Outcome = require('../models/Outcome');

// Create outcome
exports.createOutcome = async (req, res) => {
  try {
    const { course, program, code, description } = req.body;
    
    // Create new outcome
    const outcome = new Outcome({
      course,
      program,
      code,
      description,
      createdBy: req.userId
    });

    await outcome.save();
    res.status(201).json(outcome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all outcomes
exports.getOutcomes = async (req, res) => {
  try {
    const outcomes = await Outcome.find({ createdBy: req.userId })
      .sort({ createdAt: -1 });
    res.json(outcomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single outcome
exports.getOutcome = async (req, res) => {
  try {
    const outcome = await Outcome.findById(req.params.id);
    
    if (!outcome) {
      return res.status(404).json({ error: 'Outcome not found' });
    }

    // Check if user owns the outcome
    if (outcome.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    res.json(outcome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update outcome
exports.updateOutcome = async (req, res) => {
  try {
    const { course, program, code, description } = req.body;
    
    // Find outcome
    let outcome = await Outcome.findById(req.params.id);
    
    if (!outcome) {
      return res.status(404).json({ error: 'Outcome not found' });
    }

    // Check if user owns the outcome
    if (outcome.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Update outcome
    outcome = await Outcome.findByIdAndUpdate(
      req.params.id,
      { course, program, code, description },
      { new: true }
    );

    res.json(outcome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete outcome
exports.deleteOutcome = async (req, res) => {
  try {
    const outcome = await Outcome.findById(req.params.id);
    
    if (!outcome) {
      return res.status(404).json({ error: 'Outcome not found' });
    }

    // Check if user owns the outcome
    if (outcome.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await outcome.remove();
    res.json({ msg: 'Outcome removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};