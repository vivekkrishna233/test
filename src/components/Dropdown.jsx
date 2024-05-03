import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: '20%',
    Width: 700, 
  }));

const Dropdown = ({ values, label, selectedValues, setSelectedValues }) => {

  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <StyledFormControl>
        <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default Dropdown;
