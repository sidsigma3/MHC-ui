import React from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// Sample countries with flag URLs or emojis
const Roles = [
  { name: 'Admin', },
  { name: 'Sale Executive'},
  { name: 'Sales Team Lead'} ,
  { name: 'Sales Team Manager'},

];

const RoleInput = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth size="small">
    <InputLabel 
      sx={{
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#131517',
      }}
      InputLabelProps={{
        shrink: true, 
      }}
    >
      {label}
    </InputLabel>

    <Select
      value={value}
      onChange={onChange}
      label={label}
    >
      {Roles.map((role,index) => (
        <MenuItem key={index} value={role.name}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );
};

export default RoleInput;
