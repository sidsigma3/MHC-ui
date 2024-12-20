import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

// List of country options (sample, can be expanded)
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
];

const PhoneNumberInput = ({ label, value, onChange, helperText }) => {
  const [selectedCountry, setSelectedCountry] = useState('IN'); // Default to India

  return (
    <FormControl fullWidth size="small" sx={{ mt: 2 }} error={!value}>
      {/* <InputLabel sx={{ color: '#131517' }}>{label}</InputLabel> */}
      
      {/* Country Selector */}
      {/* <Select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        label="Country"
        size="small"
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select> */}
      
      <PhoneInput
        international
       
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        style={{
          width: '100%',
          marginTop: '8px',
        }}
      />
      
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PhoneNumberInput;
