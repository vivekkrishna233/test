import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { Grid } from '@mui/material';
import Dropdown from './Dropdown';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [minExpValues, setMinExpValues] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [locations, setLocations] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [roles, setRoles] = useState([]);


  // Define state for filters
  const [filters, setFilters] = useState({
    minExp: [],
    companyName: [],
    location: [],
    minJdSalary: [], 
    salaryCurrencyCode: [], 
    jobRole: []
  });

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "limit": 10,
          "offset": offset
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data",data)

      setJobs(prevJobs => [...prevJobs, ...data.jdList]);
      setOffset(prevOffset => prevOffset + 10);
      setIsLoading(false);
      const uniqueMinExpValues = [...new Set(data.jdList.map(job => job.minExp))];
      setMinExpValues(uniqueMinExpValues);
      
      const uniqueCompanyNames = [...new Set(data.jdList.map(job => job.companyName))];
      setCompanyNames(uniqueCompanyNames);

      const uniqueLocations = [...new Set(data.jdList.map(job => job.location))];
      setLocations(uniqueLocations);

      const uniqueSalaries = [...new Set(data.jdList.map(job => job.minJdSalary))];
      setSalaries(uniqueSalaries);

      const uniqueCurrencies = [...new Set(data.jdList.map(job => job.salaryCurrencyCode))];
      setCurrencies(uniqueCurrencies);

      const uniqueRoles = [...new Set(data.jdList.map(job => job.jobRole))];
      setRoles(uniqueRoles);

    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // Fetch more jobs when user scrolls
  const handleScroll = () => {
    if (!isLoading && hasMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setIsLoading(true); 
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter(job => {
    return (
      (filters.minExp.length === 0 || filters.minExp.includes(job.minExp)) &&
      (filters.companyName.length === 0 || filters.companyName.includes(job.companyName)) &&
      (filters.location.length === 0 || filters.location.includes(job.location))&&
      (filters.minJdSalary.length === 0 || filters.minJdSalary.includes(job.minJdSalary))&&
      (filters.jobRole.length === 0 || filters.jobRole.includes(job.jobRole))&&
      (filters.salaryCurrencyCode.length === 0 || filters.salaryCurrencyCode.includes(job.salaryCurrencyCode ))
    );
  });

  // Function to handle filter change
  const handleFilterChange = (filterName, selectedValues) => {
    setFilters({
      ...filters,
      [filterName]: selectedValues,
    });
  };

  if (isLoading && !jobs.length) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
   <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
  <Dropdown
    values={minExpValues}
    label="Min experience"
    selectedValues={filters.minExp} 
    setSelectedValues={selectedValues => handleFilterChange('minExp', selectedValues)}
  />
  <Dropdown
    values={companyNames} 
    label="Company name"
    selectedValues={filters.companyName} 
    setSelectedValues={selectedValues => handleFilterChange('companyName', selectedValues)}
  />
  <Dropdown
    values={locations} 
    label="Location"
    selectedValues={filters.location} 
    setSelectedValues={selectedValues => handleFilterChange('location', selectedValues)}
  />
  <Dropdown
    values={roles}
    label="Job role"
    selectedValues={filters.jobRole} 
    setSelectedValues={selectedValues => handleFilterChange('jobRole', selectedValues)}
  />
  <Dropdown
    values={currencies}
    label="Salary currency"
    selectedValues={filters.salaryCurrencyCode} 
    setSelectedValues={selectedValues => handleFilterChange('salaryCurrencyCode', selectedValues)}
  />
  <Dropdown
    values={salaries}
    label="Min base pay"
    selectedValues={filters.minJdSalary} 
    setSelectedValues={selectedValues => handleFilterChange('minJdSalary', selectedValues)}
  />
</div>
      <Grid container spacing={4}  sx={{mt:'1% !important'}}>
        {filteredJobs.map((job, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {isLoading && <div>Loading more...</div>}
      {!isLoading && !hasMore && <div>No more jobs to load</div>}
    </div>
  );
};

export default JobList;
