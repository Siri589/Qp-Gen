const mongoose = require('mongoose');
const path = require('path');

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for file URL (in case fileUrl is not set)
MaterialSchema.virtual('url').get(function() {
  return `/uploads/materials/${path.basename(this.filePath)}`;
});

module.exports = mongoose.model('Material', MaterialSchema);