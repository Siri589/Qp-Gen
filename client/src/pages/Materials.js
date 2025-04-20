import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('/api/materials');
      console.log('Materials response:', response.data); // Debug log
      setMaterials(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load materials');
      setLoading(false);
    }
  };

  const handleView = (material) => {
    try {
      console.log('Material to view:', material); // Debug log
      if (!material || !material.filePath) {
        throw new Error('Invalid material data');
      }

      // Construct the file URL using the filePath
      const fileName = material.filePath.split('\\').pop(); // Handle Windows paths
      const fileUrl = `${axios.defaults.baseURL}/uploads/materials/${fileName}`;
      console.log('Opening URL:', fileUrl); // Debug log
      window.open(fileUrl, '_blank');
    } catch (err) {
      console.error('Error viewing file:', err);
      alert('Unable to view file. Please try again.');
    }
  };

  const handleDownload = async (material) => {
    try {
      if (!material || !material.filePath) {
        throw new Error('Invalid material data');
      }

      // Construct the file URL using the filePath
      const fileName = material.filePath.split('\\').pop(); // Handle Windows paths
      const fileUrl = `${axios.defaults.baseURL}/uploads/materials/${fileName}`;
      console.log('Downloading from:', fileUrl); // Debug log
      
      const response = await axios.get(fileUrl, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', material.fileName || fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading file:', err);
      alert('Failed to download file. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading materials...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Learning Materials
        </Typography>
        <Button
          component={Link}
          to="/upload-material"
          variant="contained"
          color="primary"
        >
          Upload New Material
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {materials.map((material) => (
          <Grid item xs={12} sm={6} md={4} key={material._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {material.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {material.subject} - {material.course}
                </Typography>
                {material.description && (
                  <Typography color="textSecondary" variant="body2">
                    {material.description}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleView(material)}
                >
                  View
                </Button>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleDownload(material)}
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {materials.length === 0 && (
        <Typography sx={{ mt: 4, textAlign: 'center' }}>
          No materials uploaded yet. Click "Upload New Material" to add your first material.
        </Typography>
      )}
    </Container>
  );
};

export default Materials; 