const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,  // duration in minutes
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);