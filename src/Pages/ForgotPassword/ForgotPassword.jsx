import React , {useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';
import axios from 'axios';

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");


    const handleSendCode = async () => {
        try {
            await axios.post("https://mhc-backend-six.vercel.app/api/users/resetPassword", { email });
            navigate("/EnterCode", { state: { email } });
        } catch (err) {
            setError(err.response?.data?.message || "Error sending code");
        }
    };

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
            <InputField text={'E-mail'} icon={'email'} value={email} onChange={(e)=>setEmail(e.target.value)}></InputField>

        </div>

        <div className='p-3'>
            <button className='btn btn-dark p-2 w-100' onClick={handleSendCode}>Send code</button>
        </div>


    </div>
  )
}

export default ForgotPassword