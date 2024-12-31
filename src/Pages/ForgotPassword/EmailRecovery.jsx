import React , {useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate , useLocation} from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';


const EmailRecovery = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const location = useLocation();
    const email = location.state?.email;

    const handleVerifyCode = () => {
        navigate("/resetPassword", { state: { email, code } });
    };


  return (
    <div>
         <div className='top p-3' onClick={()=>navigate('/')}>
            <span><IoMdArrowBack size={22}/></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Please check your email</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary text-center'>We have sent a code to<span className='fw-medium'>  helloWorld@gmail.com</span>
            </h6>

        </div>

        <div className='p-3'>
            <InputField text={'Enter code *'}  value={code}  onChange={(e) => setCode(e.target.value)}></InputField>
        </div>

        <div className='p-3'>
            <button className='btn btn-dark p-2 w-100' onClick={handleVerifyCode}>Verify</button>
        </div>


    </div>
  )
}

export default EmailRecovery