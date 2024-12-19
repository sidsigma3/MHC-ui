import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';

const SignupPage = () => {
    const navigate = useNavigate()


  return (
    <div className='signup-page p-2'>
        <div className='top' onClick={()=>navigate('/')}>
            <span><IoMdArrowBack /></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold'>Sign up to your Account</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Enter your email and password to signup</h6>

        </div>


        <div className='p-3'>
            <div className='row row-gap-3'>
                    <div className='col-6'>
                        <InputField text={'First name *'}></InputField>
                    </div>

                    <div className='col-6'>
                        <InputField text={'Last name *'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'E-mail *'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'Last Password *'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'Phone *'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'City'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'Birthday'}></InputField>
                    </div>

                    <div className='col-12'>
                        <InputField text={'Nationality'}></InputField>
                    </div>
            </div>

            <div className='mt-2'>
            <button className='btn btn-dark btn-sm w-100'>Register</button>
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
            <h6 className='text-body-tertiary'>Already have an account ?<span onClick={()=>navigate('/')} className='text-black'>Log in</span></h6>
        </div>

        </div>



    </div>
  )
}

export default SignupPage