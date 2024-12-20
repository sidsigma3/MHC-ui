import React from 'react';
import { TextField, Autocomplete, FormControl, InputLabel, MenuItem } from '@mui/material';


const indianCities = [
  { code: 'DEL', name: 'Delhi' },
  { code: 'MUM', name: 'Mumbai' },
  { code: 'BLR', name: 'Bangalore' },
  { code: 'CHN', name: 'Chennai' },
  { code: 'KOL', name: 'Kolkata' },
  { code: 'HYD', name: 'Hyderabad' },
  { code: 'PUN', name: 'Pune' },
  { code: 'JAIP', name: 'Jaipur' },
  { code: 'AGRA', name: 'Agra' },
  { code: 'IND', name: 'Indore' },
];

const CityInput = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth size="small">
      {/* <InputLabel sx={{ color: '#131517' }}>{label}</InputLabel> */}
      <Autocomplete
        options={indianCities}
        getOptionLabel={(option) => option.name}
        value={value}
        onChange={(event, newValue) => onChange(newValue)}
        sx={{
            '& .MuiInputBase-root':{
                height:'2.5rem'
            }
        }}
        renderInput={(params) => 
        <TextField {...params} 
            label={label}  
            InputLabelProps={{
            shrink: true, 
            }}
            sx={{
                '& .MuiFormLabel-root': {
                  fontSize: '0.9rem',
                  fontWeight:'bold',
                  color:'#131517',
                  width:'100%'
                }
              }}
          />}
      />
    </FormControl>
  );
};

export default CityInput;
