import React from 'react';
import { TextField, Autocomplete, FormControl, InputLabel, MenuItem } from '@mui/material';

const indianCities = [
  { name: 'Delhi' },
  { name: 'Mumbai' },
  { name: 'Bangalore' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Hyderabad' },
  { name: 'Pune' },
  { name: 'Jaipur' },
  { name: 'Agra' },
  { name: 'Indore' },
];

const CityInput = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth size="small">
      <Autocomplete
        options={indianCities}
        getOptionLabel={(option) => option.name}
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        sx={{
          '& .MuiInputBase-root': {
            height: '2.5rem',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#131517',
                width: '100%',
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default CityInput;
