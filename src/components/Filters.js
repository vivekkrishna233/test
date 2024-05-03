// src/components/Filters.js
import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const Filters = ({ onFilterChange }) => {
  const handleChange = (event) => {
    // Handle filter changes
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField label="Min Experience" variant="outlined" onChange={handleChange} />
      </Grid>
      {/* Add other filter fields */}
      <Grid item>
        <Button variant="contained" color="primary">Apply Filters</Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
