import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  subject: Yup.string().required('Subject is required'),
  course: Yup.string().required('Course is required'),
  description: Yup.string(),
});

const UploadMaterial = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = selectedFile ? '.' + selectedFile.name.split('.').pop().toLowerCase() : '';

    if (selectedFile && allowedTypes.includes(fileExtension)) {
      setFile(selectedFile);
      setFileError('');
    } else {
      setFile(null);
      setFileError('Please select a valid file (PDF, DOC, DOCX, or TXT)');
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!file) {
      setFileError('Please select a file to upload');
      setSubmitting(false);
      return;
    }

    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('subject', values.subject);
      formData.append('course', values.course);
      formData.append('description', values.description || '');
      formData.append('file', file);

      await axios.post('/api/materials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('success');
      resetForm();
      setFile(null);

      // ✅ Navigate to materials page after a brief delay
      setTimeout(() => {
        navigate('/materials');
      }, 1500);
    } catch (error) {
      setUploadStatus('error');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Upload Study Material
        </Typography>

        {uploadStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            File uploaded successfully!
          </Alert>
        )}
        {uploadStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong. Please try again.
          </Alert>
        )}

        <Formik
          initialValues={{ title: '', subject: '', course: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    error={touched.subject && Boolean(errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Course"
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    error={touched.course && Boolean(errors.course)}
                    helperText={touched.course && errors.course}
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
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </Button>
                  {file && <FormHelperText>Selected File: {file.name}</FormHelperText>}
                  {fileError && <FormHelperText error>{fileError}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Uploading...' : 'Upload Material'}
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

export default UploadMaterial;
