import React from 'react';
import { Container } from '@mui/material';
import JobList from './components/JobList';

function App() {
  return (
    <Container maxWidth="md">
      <h1>Job Listings</h1>
      
      <JobList />
    </Container>
  );
}

export default App;