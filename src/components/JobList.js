// src/components/JobList.js
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { Grid } from '@mui/material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

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
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleScroll = () => {
    if (!isLoading && hasMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      fetchJobs();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isLoading && !jobs.length) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid container spacing={3}>
    {jobs.map((job, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <JobCard job={job} />
      </Grid>
    ))}
    {isLoading && <div>Loading more...</div>}
    {!isLoading && !hasMore && <div>No more jobs to load</div>}
  </Grid>
  );
};

export default JobList;
