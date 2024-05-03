import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const truncate = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export default function JobCard({ job }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleReviewMoreClick = () => {
    window.open(job.jdLink, '_blank');
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
          <img src={job.logoUrl} alt={job.companyName} style={{ height: 20, marginRight: 5 }} /> {/* Include the logo */}
          </div>
        <div>
        <Typography variant="subtitle1" gutterBottom>
          {job.companyName}
        </Typography>
        </div>
        </div>
        <Typography variant="h5" component="div">
          {job.jobRole}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Estimated Salary: {job.minJdSalary}-{job.maxJdSalary} {job.salaryCurrencyCode}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Location: {job.location}
        </Typography>
        {expanded ? (
          <Typography variant="body2" component="p">
            {job.jobDetailsFromCompany}
          </Typography>
        ) : (
          <Typography variant="body2" component="p">
            {truncate(job.jobDetailsFromCompany, 100)}
          </Typography>
        )}
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button color="primary" onClick={handleReviewMoreClick}>view jobs</Button> 
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </div>
        <Typography variant="body2" color="textSecondary">
          Minimum Experience
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job.minExp} - {job.maxExp} years
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <Button variant="contained" size="medium"  sx={{ width: '100%' ,  bgcolor: '#4AEFB7' }}>
        Eassy Apply
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" size="medium" sx={{ width: '100%'  ,bgcolor: '#392ECA'}}>
        Unlock Refral Ask
      </Button>
    </Grid>
  </Grid>
</CardActions>
    </Card>
  );
}
