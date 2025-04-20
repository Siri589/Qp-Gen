import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Slider,
  Typography,
  Button,
} from '@mui/material';

const QuestionFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    subjects: [],
    types: [],
    difficultyRange: [1, 10],
    topics: [],
  });

  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'];
  const questionTypes = ['MCQ', 'Short Answer', 'Long Answer'];
  const topics = ['Programming', 'Data Structures', 'Algorithms', 'Web Development', 'Database'];

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      searchQuery: '',
      subjects: [],
      types: [],
      difficultyRange: [1, 10],
      topics: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Search Query */}
        <TextField
          fullWidth
          label="Search Questions"
          variant="outlined"
          value={filters.searchQuery}
          onChange={(e) => handleChange('searchQuery', e.target.value)}
        />

        {/* Subject Selection */}
        <FormControl fullWidth>
          <InputLabel>Subjects</InputLabel>
          <Select
            multiple
            value={filters.subjects}
            onChange={(e) => handleChange('subjects', e.target.value)}
            input={<OutlinedInput label="Subjects" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Question Types */}
        <FormControl fullWidth>
          <InputLabel>Question Types</InputLabel>
          <Select
            multiple
            value={filters.types}
            onChange={(e) => handleChange('types', e.target.value)}
            input={<OutlinedInput label="Question Types" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {questionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Topics */}
        <FormControl fullWidth>
          <InputLabel>Topics</InputLabel>
          <Select
            multiple
            value={filters.topics}
            onChange={(e) => handleChange('topics', e.target.value)}
            input={<OutlinedInput label="Topics" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {topics.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Difficulty Range */}
        <Box>
          <Typography gutterBottom>Difficulty Range</Typography>
          <Slider
            value={filters.difficultyRange}
            onChange={(e, newValue) => handleChange('difficultyRange', newValue)}
            valueLabelDisplay="auto"
            min={1}
            max={10}
            marks={[
              { value: 1, label: 'Easy' },
              { value: 5, label: 'Medium' },
              { value: 10, label: 'Hard' },
            ]}
          />
        </Box>

        {/* Reset Button */}
        <Button variant="outlined" onClick={handleReset} fullWidth>
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionFilter; 