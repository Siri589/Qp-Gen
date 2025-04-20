const Material = require('../models/Material');
const fs = require('fs');
const path = require('path');

// Upload material
exports.uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    const { title, description, subject, course } = req.body;
    
    // Create new material
    const material = new Material({
      title,
      description,
      subject,
      course,
      filePath: req.file.path,
      fileUrl: `/uploads/materials/${path.basename(req.file.path)}`,
      fileName: req.file.originalname,
      fileType: path.extname(req.file.originalname).substring(1),
      uploadedBy: req.userId
    });

    // If text file, read content
    if (material.fileType === 'txt') {
      const content = fs.readFileSync(req.file.path, 'utf8');
      material.content = content;
    }

    await material.save();
    res.status(201).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ uploadedBy: req.userId })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // Add full URLs to materials
    materials.forEach(material => {
      if (!material.fileUrl) {
        material.fileUrl = `/uploads/materials/${path.basename(material.filePath)}`;
      }
    });

    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single material
exports.getMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Check if user owns the material
    if (material.uploadedBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Add full URL if not present
    if (!material.fileUrl) {
      material.fileUrl = `/uploads/materials/${path.basename(material.filePath)}`;
    }

    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Check if user owns the material
    if (material.uploadedBy.toString() !== req.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Delete file from storage
    if (fs.existsSync(material.filePath)) {
      fs.unlinkSync(material.filePath);
    }

    await material.remove();
    res.json({ msg: 'Material removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};