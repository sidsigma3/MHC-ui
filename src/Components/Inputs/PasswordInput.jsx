// PasswordInput.js
import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

const PasswordInput = ({ label, placeholder, value, onChange ,name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
    label={label}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    type={showPassword ? 'text' : 'password'}
    InputLabelProps={{
      shrink: true,
    }}
    size="small"
    fullWidth
    sx={{
      '& .MuiFormLabel-root': {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#131517',
      },
    }}
    InputProps={{
      endAdornment: (
        <IconButton
          sx={{
            padding: 0, // Remove all padding
          }}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <PiEyeSlash size={20} /> : <PiEyeLight size={20} />}
        </IconButton>
      ),
    }}
  />
  );
};

export default PasswordInput;
