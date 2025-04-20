import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const OutcomesPage = () => {
  const [outcomes, setOutcomes] = useState([]);

  useEffect(() => {
    // TODO: Fetch learning outcomes from the server
    // This is a placeholder for the actual API call
    setOutcomes([]);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Learning Outcomes
      </Typography>
      <Grid container spacing={3}>
        {outcomes.map((outcome) => (
          <Grid item xs={12} key={outcome._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {outcome.title}
                </Typography>
                <Typography color="textSecondary" paragraph>
                  {outcome.description}
                </Typography>
                <Button variant="contained" color="primary">
                  Generate Questions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OutcomesPage; 