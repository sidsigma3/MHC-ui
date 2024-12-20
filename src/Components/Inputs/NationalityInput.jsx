import React from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// Sample countries with flag URLs or emojis
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

const NationalityInput = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth size="small" >
      
      <InputLabel 
        sx={{
            fontSize: '0.9rem',
            fontWeight:'bold',
            color:'#131517', }}

    >{label}
      </InputLabel>

      <Select
        value={value}
        onChange={onChange}
        label={label}
        defaultValue="IN"
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <span style={{ marginRight: '8px' }}>{country.flag}</span>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NationalityInput;
