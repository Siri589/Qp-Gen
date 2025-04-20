const express = require('express');
const router = express.Router();
const { 
  generateQuestions, 
  saveQuestion, 
  getQuestions, 
  getQuestion, 
  updateQuestion, 
  deleteQuestion,
  createQuestionPaper
} = require('../controllers/questionController');
const auth = require('../middleware/auth');

// Generate questions
router.post('/generate', auth, generateQuestions);

// Save question
router.post('/', auth, saveQuestion);

// Get all questions
router.get('/', auth, getQuestions);

// Get single question
router.get('/:id', auth, getQuestion);

// Update question
router.put('/:id', auth, updateQuestion);

// Delete question
router.delete('/:id', auth, deleteQuestion);

// Create question paper
router.post('/paper', auth, createQuestionPaper);

module.exports = router;