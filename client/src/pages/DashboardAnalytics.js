import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axios from '../utils/axiosConfig';

const DashboardAnalytics = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    questionsByType: [],
    recentActivity: [],
    subjectDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Simulated data - replace with actual API calls
      const data = {
        totalQuestions: 150,
        questionsByType: [
          { type: 'MCQ', count: 80 },
          { type: 'Short Answer', count: 45 },
          { type: 'Long Answer', count: 25 },
        ],
        subjectDistribution: [
          { subject: 'Computer Science', count: 50 },
          { subject: 'Mathematics', count: 40 },
          { subject: 'Physics', count: 30 },
          { subject: 'Chemistry', count: 30 },
        ],
        recentActivity: [
          { date: '2024-01', papers: 15 },
          { date: '2024-02', papers: 18 },
          { date: '2024-03', papers: 22 },
          { date: '2024-04', papers: 20 },
        ],
      };
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Questions
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalQuestions}
            </Typography>
          </Paper>
        </Grid>

        {/* Question Types Chart */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Questions by Type
            </Typography>
            <ResponsiveContainer>
              <BarChart
                data={stats.questionsByType}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Subject Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Subject Distribution
            </Typography>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats.subjectDistribution}
                  dataKey="count"
                  nameKey="subject"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Papers Generated (Monthly)
            </Typography>
            <ResponsiveContainer>
              <BarChart
                data={stats.recentActivity}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="papers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardAnalytics; 