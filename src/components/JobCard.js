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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Company: {job.company}
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
            {truncate(job.jobDetailsFromCompany, 40)}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          Experience Required: {job.minExp} - {job.maxExp} years
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Salary: {job.minJdSalary}-{job.maxJdSalary} {job.salaryCurrencyCode}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
