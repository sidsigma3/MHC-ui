import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';



const ResetPassword = () => {

    const navigate = useNavigate()

  return (
    <div>
          <div className='top p-3' onClick={()=>navigate('/')}>
            <span><IoMdArrowBack size={22}/></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Reset Password</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary text-center'>Please type something you'll remember</h6>
        </div>

        <div className='p-3'>
            <InputField text={'New password *'} ></InputField>
        </div>

        <div className='p-3'>
            <InputField text={'Confirm new password *'} ></InputField>
        </div>

        <div className='p-3'>
            <button className='btn btn-dark p-2 w-100'>Verify</button>
        </div>


    </div>
  )
}

export default ResetPassword