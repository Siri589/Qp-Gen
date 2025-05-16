import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Course name is required'),
  description: Yup.string(),
  outcomes: Yup.array()
    .of(Yup.string().required('Each outcome is required'))
    .required('Course outcomes are required'),
});

const DefineCourse = () => {
  const [status, setStatus] = useState(null);
  const [files, setFiles] = useState([]);
  const [coPoMapping, setCoPoMapping] = useState({});
  const [outcomes, setOutcomes] = useState(['', '', '', '', '']); // Five blocks for outcomes

  const poHeaders = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PSO1', 'PSO2'];
  const mappingScale = [1, 2, 3]; // 1: Low, 2: Medium, 3: High

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleOutcomeChange = (index, value) => {
    const updatedOutcomes = [...outcomes];
    updatedOutcomes[index] = value;
    setOutcomes(updatedOutcomes);
  };

  const handleMappingChange = (outcome, po, value) => {
    setCoPoMapping((prev) => ({
      ...prev,
      [outcome]: {
        ...prev[outcome],
        [po]: value,
      },
    }));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setStatus('loading');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('outcomes', JSON.stringify(outcomes));
      formData.append('coPoMapping', JSON.stringify(coPoMapping));

      for (const file of files) {
        formData.append('materials', file);
      }

      await axios.post('/api/courses/define-course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('success');
      resetForm();
      setFiles([]);
      setCoPoMapping({});
      setOutcomes(['', '', '', '', '']);
    } catch (error) {
      setStatus('error');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Define a New Course
        </Typography>

        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Course defined successfully!
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong. Please try again.
          </Alert>
        )}

        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Course Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description (optional)"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Course Outcomes
                  </Typography>
                  <Grid container spacing={2}>
                    {outcomes.map((outcome, index) => (
                      <Grid item xs={12} key={index}>
                        <TextField
                          fullWidth
                          label={`Outcome ${index + 1}`}
                          value={outcome}
                          onChange={(e) => handleOutcomeChange(index, e.target.value)}
                          error={touched.outcomes && Boolean(errors.outcomes?.[index])}
                          helperText={touched.outcomes && errors.outcomes?.[index]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    CO-PO-PSO Mapping
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Outcomes</TableCell>
                          {poHeaders.map((header) => (
                            <TableCell key={header} align="center">
                              {header}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {outcomes.map((outcome, index) => (
                          <TableRow key={`row-${index}`}>
                            <TableCell>{`CO${index + 1}`}</TableCell>
                            {poHeaders.map((po) => (
                              <TableCell key={`${outcome}-${po}`} align="center">
                                <Select
                                  value={coPoMapping[`CO${index + 1}`]?.[po] || ''}
                                  onChange={(e) =>
                                    handleMappingChange(`CO${index + 1}`, po, e.target.value)
                                  }
                                  displayEmpty
                                  fullWidth
                                  size="small"
                                >
                                  <MenuItem value="">-</MenuItem>
                                  {mappingScale.map((scale) => (
                                    <MenuItem key={scale} value={scale}>
                                      {scale}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Mapping Scale:</strong> 1 - Low correlation | 2 - Medium correlation | 3 - High correlation
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                  >
                    Upload Study Materials
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf"
                    />
                  </Button>
                  {files.length > 0 && (
                    <FormHelperText>
                      {files.length} file(s) selected
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Submitting...' : 'Define Course'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default DefineCourse;