import React from 'react';
import { Button, Grid, Typography, Paper, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Upload, School, QuestionAnswer, LibraryBooks, Add, Visibility } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome, Siri P
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Department: Information Technology
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="Upload study materials for your courses">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/upload-material"
                startIcon={<Upload />}
                fullWidth
              >
                Upload Study Material
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="Manage course outcomes">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/outcomes"
                startIcon={<School />}
                fullWidth
              >
                Manage Course Outcomes
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="Generate questions for exams">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/generate-questions"
                startIcon={<QuestionAnswer />}
                fullWidth
              >
                Generate Questions
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="View the question bank">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/question-bank"
                startIcon={<LibraryBooks />}
                fullWidth
              >
                Question Bank
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="Create a new course">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/define-course"
                startIcon={<Add />}
                fullWidth
              >
                Create Course
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="View all courses">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/courses"
                startIcon={<Visibility />}
                fullWidth
              >
                View Courses
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Dashboard;