import React from 'react'
import TextField from '@mui/material/TextField';
import InputField from '../../Components/Inputs/InputField';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate = useNavigate()



  return (
    <div className='login-page p-2 h-100'>
        <div className='top-ctn d-flex justify-content-center'>
            <img src='./images/mhc-logo.png'></img>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold'>Sign in to your Account</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Enter your email and password to login</h6>

        </div>

        <div className='p-3'>
        <div className='mt-4 d-flex flex-column gap-3'>
            <InputField text={'Username'}></InputField>

            <InputField text='Password'></InputField>
        </div>

        <div className='mt-2 d-flex gap-2'>
            <input type='checkbox'></input>
            <label style={{fontSize:'0.8rem'}} className='fw-medium'>Remember me</label>
        </div>

        <div>
            <a style={{fontSize:'0.8rem'}} className='text-danger ?'>Forgot Password</a>
        </div>
        </div>

        <div>
            <button className='btn btn-dark btn-sm w-100'>Log in</button>
        </div>


        <div>
            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-1'>
                <img src='./images/google-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Google</h5>
            </div>

            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-1'>
                <img src='./images/fb-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Facebook</h5>
            </div>
        </div>

        <div className='text-center mt-2'>
            <h6 className='text-body-tertiary'>Dont have an account ? <span onClick={()=>navigate('/signUp')} className='text-black'>Sign Up</span></h6>
        </div>

    </div>
  )
}

export default LoginPage