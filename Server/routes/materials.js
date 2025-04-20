const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadMaterial, getMaterials, getMaterial, deleteMaterial } = require('../controllers/materialController');
const auth = require('../middleware/auth');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/materials';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PDF, DOC, DOCX, and TXT are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload material
router.post('/', auth, upload.single('file'), uploadMaterial);

// Get all materials
router.get('/', auth, getMaterials);

// Get single material
router.get('/:id', auth, getMaterial);

// Delete material
router.delete('/:id', auth, deleteMaterial);

module.exports = router;