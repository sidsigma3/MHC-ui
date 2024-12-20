import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';


const ForgotPassword = () => {

    const navigate = useNavigate()

  return (
    <div className='forgot-pass-page'>
         <div className='top p-3' onClick={()=>navigate('/')}>
            <span><IoMdArrowBack size={22}/></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Forgot password?</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary text-center'>Don't worry it happens. <br></br> Please Enter 
                the email associated with your account.
            </h6>

        </div>

        <div className='p-3'>
            <InputField text={'E-mail'} icon={'email'}></InputField>

        </div>

        <div className='p-3'>
            <button className='btn btn-dark p-2 w-100' onClick={()=>navigate('/EnterCode')}>Send code</button>
        </div>


    </div>
  )
}

export default ForgotPassword