import React , {useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate , useLocation} from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';
import axios from 'axios';


const ResetPassword = () => {

    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const { email, code } = location.state || {};

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post("https://mhc-backend-six.vercel.app/api/users/resetPassword/enterPassword", { email, code, newPassword });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Error resetting password");
        }
    };



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
            <InputField text={'New password *'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></InputField>
        </div>

        <div className='p-3'>
            <InputField text={'Confirm new password *'}   value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} ></InputField>
        </div>

        <div className='p-3'>
            <button className='btn btn-dark p-2 w-100' onClick={handleResetPassword}>Verify</button>
        </div>


    </div>
  )
}

export default ResetPassword