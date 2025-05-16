const Course = require('../models/Course');

exports.defineCourse = async (req, res) => {
  try {
    const { name, description, outcomes, coPoMapping } = req.body;

    // Parse outcomes and CO-PO mapping from JSON strings
    const parsedOutcomes = JSON.parse(outcomes);
    const parsedCoPoMapping = JSON.parse(coPoMapping);

    const course = new Course({
      name,
      description,
      outcomes: parsedOutcomes,
      coPoMapping: parsedCoPoMapping,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create course', error });
  }
};

// Define defineCourse if missing
const defineCourse = (req, res) => {
  // Placeholder implementation
  res.json({ message: 'defineCourse is working' });
};

// Define getCourses if missing
const getCourses = (req, res) => {
  // Placeholder implementation
  res.json({ message: 'getCourses is working' });
};

module.exports = {
  defineCourse,
  getCourses,
};