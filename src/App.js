import React from 'react';
import { Container } from '@mui/material';
import JobList from './components/JobList';

function App() {
  return (
    <Container maxWidth="md">
      <JobList />
    </Container>
  );
}

export default App;