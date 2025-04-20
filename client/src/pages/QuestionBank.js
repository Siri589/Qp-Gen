import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';
import QuestionFilter from '../components/QuestionFilter';
import QuestionPreview from '../components/QuestionPreview';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchQuestions = async () => {
      try {
        // Simulated API response
        const mockQuestions = [
          {
            id: 1,
            text: 'What is the time complexity of QuickSort in the average case?',
            type: 'MCQ',
            subject: 'Computer Science',
            topic: 'Algorithms',
            difficulty: 7,
            marks: 2,
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correctAnswer: 'O(n log n)',
          },
          {
            id: 2,
            text: 'Explain the concept of inheritance in object-oriented programming.',
            type: 'Short Answer',
            subject: 'Computer Science',
            topic: 'Programming',
            difficulty: 5,
            marks: 5,
          },
          // Add more mock questions as needed
        ];

        setQuestions(mockQuestions);
        setFilteredQuestions(mockQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...questions];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query)
      );
    }

    // Apply subject filter
    if (filters.subjects.length > 0) {
      filtered = filtered.filter(q => filters.subjects.includes(q.subject));
    }

    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(q => filters.types.includes(q.type));
    }

    // Apply topic filter
    if (filters.topics.length > 0) {
      filtered = filtered.filter(q => filters.topics.includes(q.topic));
    }

    // Apply difficulty range
    filtered = filtered.filter(q => 
      q.difficulty >= filters.difficultyRange[0] && 
      q.difficulty <= filters.difficultyRange[1]
    );

    setFilteredQuestions(filtered);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Question Bank
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <QuestionFilter onFilterChange={handleFilterChange} />
        </Grid>

        {filteredQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Card>
              <CardContent>
                <QuestionPreview question={question} />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {filteredQuestions.length === 0 && (
          <Grid item xs={12}>
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No questions match your filters
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default QuestionBank; 