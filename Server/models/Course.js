const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
  outcomes: [{ type: String }], // List of course outcomes
  coPoMapping: { type: Map, of: Number }, // Example: { CO1: 3, PO1: 2 }
});

module.exports = mongoose.model('Course', courseSchema);