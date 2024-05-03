// Filters.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const Filters = ({ applyFilters }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleApplyFilters = () => {
    applyFilters(filterCriteria);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          label="Job Title"
          name="title"
          value={filterCriteria.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Company"
          name="company"
          value={filterCriteria.company}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Location"
          name="location"
          value={filterCriteria.location}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Experience"
          name="experience"
          value={filterCriteria.experience}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
