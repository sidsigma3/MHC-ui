// DateInput.js
import React from "react";
import { TextField } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

const DateInput = ({ label, value, onChange, placeholder ,name ,readOnly}) => {
  return (
    <TextField
      label={label}
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        readOnly: readOnly, // Makes the field read-only
      }}
      // InputProps={{
      //   endAdornment: (
      //     <CalendarToday style={{ color: "#757575", marginRight: "8px" }} />
      //   ),
      // }}
      size="small"
      fullWidth
      placeholder={placeholder}
      sx={{
        "& .MuiFormLabel-root": {
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: "#131517",
        },
        "& input": {
          paddingLeft: "10px",
          color:'#ACB5BB'
        },
      }}
    />
  );
};

export default DateInput;
