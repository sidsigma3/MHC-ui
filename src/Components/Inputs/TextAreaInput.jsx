import React from 'react'
import { TextField, InputAdornment } from '@mui/material'

const TextAreaInput = ({text,value,placeHolder,icon,onChange,name}) => {
  return (
    <div className='w-100'>
    <TextField
        id="outlined-required"
        label="Product Description"
        onChange={onChange}
        value={value}
        name={name}
        InputLabelProps={{
            shrink: true,
        }}
        placeholder="Enter product description"
        size="small"
        fullWidth
        multiline
        rows={4} // Number of visible rows in the textarea
        sx={{
            '& .MuiFormLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#131517',
                width: '100%',
            },
        }}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                  
                </InputAdornment>
            ),
        }}
    >
    </TextField>
</div>

  )
}

export default TextAreaInput