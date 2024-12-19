import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({text}) => {
  return (
    <div className='w-100'>
        <TextField
             id="outlined-required"
             label={text}
             InputLabelProps={{
               shrink: true, 
             }}
             size='small'
             fullWidth
             sx={{
                '& .MuiFormLabel-root': {
                  fontSize: '0.9rem',
                  fontWeight:'bold',
                  color:'#131517',
                  width:'100%'
                }
              }}
        >
        </TextField>
    </div>
  )
}

export default InputField