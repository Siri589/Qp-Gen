const express = require('express');
const { defineCourse, getCourses } = require('../controllers/courseController');

const router = express.Router();

router.post('/define-course', defineCourse);
router.get('/courses', getCourses); // New route to fetch all courses

module.exports = router;