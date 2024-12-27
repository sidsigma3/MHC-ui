import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { TfiEmail } from "react-icons/tfi";
import { LuEye } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
const InputField = ({text,value,placeHolder,icon,onChange,name}) => {


  const labelContent = (
    <>
      {text.includes('*') ? (
        <>
          {text.split('*')[0]}
          <span style={{ color: 'red' }}>*</span>
        </>
      ) : (
        text
      )}
    </>
  );


  const handleIcon = () =>{

    if (icon ==='email'){
      return   <TfiEmail />
    }

    else if (icon==='eye'){
      return <LuEye />
    }

    else if (icon === 'date'){
      return <MdOutlineDateRange />
    }

    else if (icon === 'call'){
      return <BsTelephone />
    }


  }





  return (
    <div className='w-100'>
        <TextField
             id="outlined-required"
             label={labelContent}
             onChange={onChange}
             value={value}
             name={name}
             InputLabelProps={{
               shrink: true, 
             }}
             placeholder={placeHolder}
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

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {handleIcon(icon)}
                </InputAdornment>
              ),
            }}
        >
        </TextField>
    </div>
  )
}

export default InputField