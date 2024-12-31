import React ,{useState} from 'react'
import TextField from '@mui/material/TextField';
import InputField from '../../Components/Inputs/InputField';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import { loginUser } from '../../Services/Api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
          setError('Please fill in both fields');
          return;
        }
    
        try {
          const data = await loginUser(username, password);
    
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId',data.id)
            localStorage.setItem("isAuthenticated", "true");
            if (data.role === 'admin') {
              navigate('/dashboard'); // Redirect to admin dashboard
            } else {
              navigate('/home'); // Redirect to user homepage
            }
          } else {
            setError(data.message || 'Something went wrong');
          }
        } catch (error) {
          setError('Network error, please try again later');
        }
      };
    


      const handleSuccess = async (tokenResponse) => {
        try {
            const { credential } = tokenResponse;
        
            // Send token to backend for validation
            const response = await axios.post(`https://mhc-backend-six.vercel.app/api/users/auth/google`, { token: credential });
        
            // Store user info and navigate to home/dashboard
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('isAuthenticated', 'true');
            if (response.data.role === 'admin') {
                navigate('/dashboard'); // Redirect to admin dashboard
              } else {
                navigate('/home'); // Redirect to user homepage
              }
           
          } catch (err) {
            setError(err.message || 'Google Login failed. Please try again.');
          }
        };
      const handleError = () => {
        console.error('Login Failed');
      };

  return (
    <div className='login-page p-2 h-100'>
        <div className='top-ctn d-flex justify-content-center mt-3'>
            <img src='./images/mhc-logo.png'></img>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Sign in to your Account</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Enter your email and password to login</h6>

        </div>

        <div className='p-3'>
        <div className='mt-4 d-flex flex-column gap-3'>
            <InputField text={'Username'} icon={'email'} onChange={(e) => setUsername(e.target.value)}></InputField>

            <PasswordInput label={'Password'} onChange={(e) => setPassword(e.target.value)}></PasswordInput>
        </div>

        <div className='mt-3 d-flex gap-2'>
            <input type='checkbox'></input>
            <label style={{fontSize:'0.8rem'}} className='fw-medium'>Remember me</label>
        </div>

        <div className='mt-2'>
            <a style={{fontSize:'0.8rem'}} className='text-danger ?' onClick={()=>navigate('/forgot-password')}>Forgot Password</a>
        </div>
        </div>

        <div className='p-3'>
            <button className='btn btn-dark btn-sm w-100 p-2' onClick={handleLogin}>Log in</button>
        </div>


       

        
        <div className="d-flex align-items-center">
            <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
            <h6 style={{ marginRight: '1rem', marginLeft : '1rem',whiteSpace: 'nowrap' , color:'grey'}}>Or</h6>
            <hr style={{ flexGrow: 1, borderTop: '1px solid grey' }} />
        </div>


        <div className='mt-2 p-3'>
             <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            {/* <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/google-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Google</h5>
            </div>

            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/fb-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Facebook</h5>
            </div> */}
        </div>

        <div className='text-center mt-2'>
            <h6 className='text-body-tertiary'>Dont have an account ? <span style={{cursor:'pointer'}} onClick={()=>navigate('/signUp')} className='text-black'>Sign Up</span></h6>
        </div>

    </div>
  )
}

export default LoginPage