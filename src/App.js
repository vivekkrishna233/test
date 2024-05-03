import React from 'react';
import { Container } from '@mui/material';
import JobList from './components/JobList';
import Filters from './components/Filters';

function App() {
  return (
    <Container maxWidth="md">
      <h1>Job Listings</h1>
      <Filters />
      <JobList />
    </Container>
  );
}

export default App;