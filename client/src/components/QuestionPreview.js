import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@mui/material';

const QuestionPreview = ({ question }) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <Box sx={{ mt: 2 }}>
            <RadioGroup>
              {question.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled
                />
              ))}
            </RadioGroup>
          </Box>
        );
      case 'short':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              placeholder="Space for short answer"
              disabled
            />
          </Box>
        );
      case 'long':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Space for detailed answer"
              disabled
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle2" color="textSecondary">
          Question ID: {question._id}
        </Typography>
        <Chip
          label={`${question.marks} Marks`}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>

      <Typography variant="body1" gutterBottom>
        {question.text}
      </Typography>

      {renderQuestionContent()}

      <Divider sx={{ my: 2 }} />

      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip
          label={question.type.toUpperCase()}
          size="small"
          color="secondary"
        />
        <Chip
          label={question.subject}
          size="small"
          variant="outlined"
        />
        {question.topics?.map((topic, index) => (
          <Chip
            key={index}
            label={topic}
            size="small"
            variant="outlined"
            color="info"
          />
        ))}
      </Box>

      {question.solution && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Solution:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {question.solution}
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default QuestionPreview; 