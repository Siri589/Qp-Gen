import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuizIcon from '@mui/icons-material/Quiz';
import ClassIcon from '@mui/icons-material/Class';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    materialCount: 0,
    outcomeCount: 0,
    questionCount: 0
  });
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch material count
        const materialsRes = await axios.get('/api/materials');
        setStats(prevStats => ({
          ...prevStats,
          materialCount: materialsRes.data.length
        }));
        setRecentMaterials(materialsRes.data.slice(0, 5));

        // Fetch outcome count
        const outcomesRes = await axios.get('/api/outcomes');
        setStats(prevStats => ({
          ...prevStats,
          outcomeCount: outcomesRes.data.length
        }));

        // Fetch question count
        const questionsRes = await axios.get('/api/questions');
        setStats(prevStats => ({
          ...prevStats,
          questionCount: questionsRes.data.length
        }));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Department: {user?.department}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/upload-material"
                  variant="contained"
                  fullWidth
                  startIcon={<UploadFileIcon />}
                >
                  Upload Study Material
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/outcomes"
                  variant="contained"
                  fullWidth
                  startIcon={<ClassIcon />}
                >
                  Manage Course Outcomes
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/generate-questions"
                  variant="contained"
                  fullWidth
                  startIcon={<QuizIcon />}
                >
                  Generate Questions
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/question-bank"
                  variant="contained"
                  fullWidth
                  startIcon={<FormatListBulletedIcon />}
                >
                  Question Bank
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Study Materials
                    </Typography>
                    <Typography variant="h3">
                      {stats.materialCount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to="/materials"
                    >
                      View All
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Course Outcomes
                    </Typography>
                    <Typography variant="h3">
                      {stats.outcomeCount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to="/outcomes"
                    >
                      View All
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Questions
                    </Typography>
                    <Typography variant="h3">
                      {stats.questionCount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to="/question-bank"
                    >
                      View All
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Materials
              </Typography>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : recentMaterials.length > 0 ? (
                <List>
                  {recentMaterials.map((material, index) => (
                    <React.Fragment key={material._id}>
                      <ListItem>
                        <ListItemText
                          primary={material.title}
                          secondary={`${material.subject} - ${material.course}`}
                        />
                      </ListItem>
                      {index < recentMaterials.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography>No materials uploaded yet.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;