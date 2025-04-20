const Question = require('../models/Question');
const Material = require('../models/Material');
const QuestionPaper = require('../models/QuestionPaper');

// Generate questions based on parameters
exports.generateQuestions = async (req, res) => {
  try {
    const { materialId, bloomsLevel, numQuestions, questionType } = req.body;
    
    // Find material
    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    
    // Check if user owns the material
    if (material.uploadedBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    // Placeholder for AI-generated questions
    // In a real application, you would use NLP or some AI service here
    // For this example, we'll just create sample questions
    
    const questions = [];
    const difficulties = ['easy', 'medium', 'hard'];
    const marks = { 'easy': 2, 'medium': 5, 'hard': 10 };
    
    for (let i = 0; i < numQuestions; i++) {
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      const question = {
        text: `Sample ${questionType} question #${i + 1} from ${material.title} at ${bloomsLevel} level`,
        subject: material.subject,
        course: material.course,
        type: questionType,
        bloomsLevel,
        difficulty,
        marks: marks[difficulty],
        options: questionType === 'multiple-choice' ? [
          { text: 'Option A', isCorrect: false },
          { text: 'Option B', isCorrect: true },
          { text: 'Option C', isCorrect: false },
          { text: 'Option D', isCorrect: false }
        ] : [],
        correctAnswer: questionType === 'multiple-choice' ? 'Option B' : 'Sample answer',
        relatedMaterial: materialId,
        createdBy: req.userId
      };
      
      questions.push(question);
    }
    
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Save question
exports.saveQuestion = async (req, res) => {
  try {
    const {
      text,
      subject,
      course,
      type,
      bloomsLevel,
      difficulty,
      marks,
      options,
      correctAnswer,
      relatedOutcome,
      relatedMaterial
    } = req.body;
    
    // Create new question
    const question = new Question({
      text,
      subject,
      course,
      type,
      bloomsLevel,
      difficulty,
      marks,
      options,
      correctAnswer,
      relatedOutcome,
      relatedMaterial,
      createdBy: req.userId
    });
    
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ createdBy: req.userId })
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single question
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    // Check if user owns the question
    if (question.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const {
      text,
      subject,
      course,
      type,
      bloomsLevel,
      difficulty,
      marks,
      options,
      correctAnswer,
      relatedOutcome,
      relatedMaterial
    } = req.body;
    
    // Find question
    let question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    // Check if user owns the question
    if (question.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    // Update question
    question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        text,
        subject,
        course,
        type,
        bloomsLevel,
        difficulty,
        marks,
        options,
        correctAnswer,
        relatedOutcome,
        relatedMaterial
      },
      { new: true }
    );
    
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    // Check if user owns the question
    if (question.createdBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    await question.remove();
    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create question paper
exports.createQuestionPaper = async (req, res) => {
  try {
    const {
      title,
      subject,
      course,
      examType,
      totalMarks,
      duration,
      questionIds
    } = req.body;
    
    // Validate question IDs
    for (const id of questionIds) {
      const question = await Question.findById(id);
      
      if (!question) {
        return res.status(404).json({ error: `Question with ID ${id} not found` });
      }
      
      // Check if user owns the question
      if (question.createdBy.toString() !== req.userId) {
        return res.status(401).json({ error: 'Not authorized to use some questions' });
      }
    }
    
    // Create new question paper
    const questionPaper = new QuestionPaper({
      title,
      subject,
      course,
      examType,
      totalMarks,
      duration,
      questions: questionIds,
      createdBy: req.userId
    });
    
    await questionPaper.save();
    res.status(201).json(questionPaper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};