import React from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// Sample countries with flag URLs or emojis
const Roles = [
  { code: 'AD', name: 'Admin', },
  { code: 'SE', name: 'Sale Executive', },
  { code: 'STL', name: 'Sales Team Lead', },
  { code: 'STM', name: 'Sales Team Manager', },
//   { code: 'JP', name: 'Japan', },
];

const RoleInput = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth size="small">
      
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
        {Roles.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <span style={{ marginRight: '8px' }}>{country.flag}</span>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleInput;
