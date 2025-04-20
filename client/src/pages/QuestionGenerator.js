import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const QuestionGenerator = () => {
  const [input, setInput] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleGenerate = async () => {
    // TODO: Implement question generation logic
    // This is a placeholder for the actual API call
    setGeneratedQuestions([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Question Generator
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Enter your content or learning outcome"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={!input.trim()}
        >
          Generate Questions
        </Button>
      </Paper>

      {generatedQuestions.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Generated Questions
          </Typography>
          {generatedQuestions.map((question, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography>{question}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default QuestionGenerator; 