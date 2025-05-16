import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const DEFAULT_POS = [
  { id: 1, code: 'PO1', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and domain expertise to solve complex engineering problems.' },
  { id: 2, code: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, and analyze engineering problems using principles of mathematics and science.' },
  { id: 3, code: 'PO3', title: 'Design/Development of Solutions', description: 'Design solutions and systems to meet specified needs with attention to safety, societal, and environmental concerns.' },
  { id: 4, code: 'PO4', title: 'Conduct Investigations of Complex Problems', description: 'Use research-based knowledge and methods to analyze problems and interpret data.' },
  { id: 5, code: 'PO5', title: 'Modern Tool Usage', description: 'Select and apply appropriate modern tools for modeling, simulation, and solution of engineering problems.' },
  { id: 6, code: 'PO6', title: 'The Engineer and Society', description: 'Apply contextual knowledge to assess societal, health, safety, legal, and cultural issues.' },
  { id: 7, code: 'PO7', title: 'Environment and Sustainability', description: 'Understand the impact of engineering solutions in global, economic, and environmental contexts and the need for sustainable development.' },
  { id: 8, code: 'PO8', title: 'Ethics', description: 'Apply ethical principles and adhere to the norms of professional engineering practice.' },
  { id: 9, code: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams and multidisciplinary environments.' },
  { id: 10, code: 'PO10', title: 'Communication', description: 'Communicate effectively with technical and non-technical audiences through reports, presentations, and documentation.' },
  { id: 11, code: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge of engineering and management principles and apply them to project execution.' }
];

const QuestionGenerator = () => {
  const [selectedPdf, setSelectedPdf] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([
    { id: 1, text: '', code: 'CO1' },
    { id: 2, text: '', code: 'CO2' },
    { id: 3, text: '', code: 'CO3' },
    { id: 4, text: '', code: 'CO4' },
    { id: 5, text: '', code: 'CO5' }
  ]);
  const [formData, setFormData] = useState({
    numberOfQuestions: 25,
    questionTypes: [],
    bloomsLevel: []
  });
  const [psos, setPsos] = useState([
    { id: 1, code: 'PSO1', description: '' },
    { id: 2, code: 'PSO2', description: '' },
    { id: 3, code: 'PSO3', description: '' }
  ]);
  const [mapping, setMapping] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedPdfs, setSelectedPdfs] = useState([]);

  useEffect(() => {
    // Mock data for demonstration; replace with API call if available
    const mockCourses = [
      {
        _id: 'course1',
        name: 'DBMS',
        materials: [
          { _id: 'pdf1', title: 'DBMS mod 1' },
          { _id: 'pdf2', title: 'DBMS mod 2' }
        ]
      },
      {
        _id: 'course2',
        name: 'EVS',
        materials: [
          { _id: 'pdf3', title: 'evs - sh125' }
        ]
      },
      {
        _id: 'course3',
        name: 'AWS',
        materials: [
          { _id: 'pdf4', title: 'aws - sh01' }
        ]
      }
    ];
    setCourses(mockCourses);
    // Uncomment below and adjust endpoint if API is available
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get('/api/courses');
    //     setCourses(response.data);
    //   } catch (error) {
    //     console.error('Error fetching courses:', error);
    //   }
    // };
    // fetchCourses();
  }, []);

  // Add PSO handler
  const handleAddPso = () => {
    const newId = psos.length + 1;
    setPsos([...psos, { id: newId, code: `PSO${newId}`, description: '' }]);
  };

  // Remove PSO handler
  const handleRemovePso = (id) => {
    setPsos(psos.filter(pso => pso.id !== id));
  };

  // Mapping handler
  const handleMappingChange = (coId, outcomeId, type, value) => {
    setMapping(prev => ({
      ...prev,
      [`${coId}-${type}-${outcomeId}`]: value
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Question Generator
      </Typography>

      <Grid container spacing={3}>
        {/* Course Selection */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Select Course
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedPdfs([]); // Reset PDFs when course changes
              }}
              displayEmpty
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="" disabled>
                Select Course
              </MenuItem>
              {courses.map(course => (
                <MenuItem key={course._id} value={course._id}>{course.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* PDF Multi-Select for selected course */}
          {selectedCourse && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Select Study Materials</Typography>
              <FormGroup>
                {courses.find(c => c._id === selectedCourse)?.materials.map(pdf => (
                  <FormControlLabel
                    key={pdf._id}
                    control={
                      <Checkbox
                        checked={selectedPdfs.includes(pdf._id)}
                        onChange={() => {
                          setSelectedPdfs(prev =>
                            prev.includes(pdf._id)
                              ? prev.filter(id => id !== pdf._id)
                              : [...prev, pdf._id]
                          );
                        }}
                      />
                    }
                    label={pdf.title}
                  />
                ))}
              </FormGroup>
            </Box>
          )}
        </Grid>

        {/* Course Outcomes */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Course Outcomes (CO)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {courseOutcomes.map((co) => (
              <TextField
                key={co.id}
                fullWidth
                variant="outlined"
                placeholder={co.code}
                value={co.text}
                onChange={(e) => {
                  const newCOs = courseOutcomes.map(item =>
                    item.id === co.id ? { ...item, text: e.target.value } : item
                  );
                  setCourseOutcomes(newCOs);
                }}
                sx={{ backgroundColor: 'white' }}
              />
            ))}
          </Box>
        </Grid>

        {/* Program Specific Outcomes */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Program Specific Outcomes (PSOs)</Typography>
            <IconButton onClick={handleAddPso} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {psos.map((pso) => (
              <Box key={pso.id} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
                  label={pso.code}
                  value={pso.description}
                  onChange={(e) => {
                    setPsos(prev => prev.map(p => 
                      p.id === pso.id ? { ...p, description: e.target.value } : p
                    ));
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
                <IconButton onClick={() => handleRemovePso(pso.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Mapping Table */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>CO-PO-PSO Mapping</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Outcomes</TableCell>
                  {DEFAULT_POS.map(po => (
                    <TableCell key={po.code} align="center" title={po.description}>
                      {po.code}
                    </TableCell>
                  ))}
                  {psos.map(pso => (
                    <TableCell key={pso.code} align="center">
                      {pso.code}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {courseOutcomes.map(co => (
                  <TableRow key={co.code}>
                    <TableCell>{co.code}</TableCell>
                    {DEFAULT_POS.map(po => (
                      <TableCell key={`${co.code}-${po.code}`} align="center">
                        <Select
                          value={mapping[`${co.id}-PO-${po.id}`] || ''}
                          onChange={(e) => handleMappingChange(co.id, po.id, 'PO', e.target.value)}
                          size="small"
                          sx={{ width: 60 }}
                        >
                          <MenuItem value="">-</MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                        </Select>
                      </TableCell>
                    ))}
                    {psos.map(pso => (
                      <TableCell key={`${co.code}-${pso.code}`} align="center">
                        <Select
                          value={mapping[`${co.id}-PSO-${pso.id}`] || ''}
                          onChange={(e) => handleMappingChange(co.id, pso.id, 'PSO', e.target.value)}
                          size="small"
                          sx={{ width: 60 }}
                        >
                          <MenuItem value="">-</MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                        </Select>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Mapping Scale:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              1 - Low correlation | 2 - Medium correlation | 3 - High correlation
            </Typography>
          </Box>
        </Grid>

        {/* Question Configuration */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Question Configuration
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Number of Questions</Typography>
            <Slider
              value={formData.numberOfQuestions}
              onChange={(e, value) => setFormData(prev => ({ ...prev, numberOfQuestions: value }))}
              min={1}
              max={50}
              valueLabelDisplay="auto"
              marks={[
                { value: 1, label: '1' },
                { value: 25, label: '25' },
                { value: 50, label: '50' }
              ]}
            />
          </Box>

          <Typography gutterBottom>Question Types</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.questionTypes.includes('mcq')}
                  onChange={() => {
                    setFormData(prev => ({
                      ...prev,
                      questionTypes: prev.questionTypes.includes('mcq')
                        ? prev.questionTypes.filter(t => t !== 'mcq')
                        : [...prev.questionTypes, 'mcq']
                    }));
                  }}
                />
              }
              label="Multiple Choice Questions"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.questionTypes.includes('descriptive')}
                  onChange={() => {
                    setFormData(prev => ({
                      ...prev,
                      questionTypes: prev.questionTypes.includes('descriptive')
                        ? prev.questionTypes.filter(t => t !== 'descriptive')
                        : [...prev.questionTypes, 'descriptive']
                    }));
                  }}
                />
              }
              label="Descriptive Questions"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.questionTypes.includes('short')}
                  onChange={() => {
                    setFormData(prev => ({
                      ...prev,
                      questionTypes: prev.questionTypes.includes('short')
                        ? prev.questionTypes.filter(t => t !== 'short')
                        : [...prev.questionTypes, 'short']
                    }));
                  }}
                />
              }
              label="Short Answer Questions"
            />
          </FormGroup>
        </Grid>

        {/* Bloom's Taxonomy */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Bloom's Taxonomy Levels
          </Typography>
          <FormGroup>
            {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={formData.bloomsLevel.includes(level.toLowerCase())}
                    onChange={() => {
                      setFormData(prev => ({
                        ...prev,
                        bloomsLevel: prev.bloomsLevel.includes(level.toLowerCase())
                          ? prev.bloomsLevel.filter(l => l !== level.toLowerCase())
                          : [...prev.bloomsLevel, level.toLowerCase()]
                      }));
                    }}
                  />
                }
                label={level}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Generate Button */}
        <Grid item xs={12}>
        <Button
          variant="contained"
            onClick={() => {
              // Handle generation logic
              console.log('Generating questions for course:', selectedCourse, 'with PDFs:', selectedPdfs);
            }}
            disabled={!selectedCourse || selectedPdfs.length === 0}
            sx={{ 
              mt: 2,
              backgroundColor: '#e0e0e0',
              color: 'black',
              '&:hover': {
                backgroundColor: '#d5d5d5'
              }
            }}
          >
            GENERATE QUESTIONS
        </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionGenerator; 