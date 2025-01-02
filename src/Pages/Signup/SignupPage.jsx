import React ,{useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';
import CityInput from '../../Components/Inputs/CityInput';
import DateInput from '../../Components/Inputs/DateInput';
import NationalityInput from '../../Components/Inputs/NationalityInput';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import { signupUser } from '../../Services/Api';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://mhc-backend-six.vercel.app';

const SignupPage = () => {
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    city: { code: 'DEL', name: 'Delhi' },
    birthdate: '',
    nationality: 'IN',
    role:'user'
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({ ...formData, [name]: value });
};

const handleCityChange = (city) => {
    setFormData({ ...formData, city });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await signupUser(formData); // API call to register user
        navigate('/'); // Redirect to login or homepage after successful signup
    } catch (err) {
        setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
        setLoading(false);
    }
};

const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const { credential } = tokenResponse;
      
      // Send token to backend for validation
      const response = await axios.post(`${API_URL}/api/users/auth/google`, { token: credential });

      // Store user info and navigate to home/dashboard
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('isAuthenticated', 'true');

      navigate('/'); // Redirect to login or home
    } catch (err) {
      setError(err.message || 'Google Sign-Up failed. Please try again.');
    }
  };

  const handleGoogleFailure = (error) => {
    setError('Google Sign-Up failed. Please try again.');
  };

  

  return (
    <div className='signup-page p-2'>
        <div className='top p-3' >
            <span onClick={()=>navigate('/')}><IoMdArrowBack size={22}/></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Sign up to your Account</h4>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Enter your email and password to signup</h6>

        </div>


        <div className='p-3'>
        {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="row row-gap-3">
                        <div className="col-6">
                            <InputField
                                name="first_name"
                                text="First name *"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <InputField
                                name="last_name"
                                text="Last name *"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <InputField
                                name="email"
                                text="E-mail *"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <PasswordInput
                                label="Password *"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <InputField
                                name="phone"
                                text="Phone *"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <CityInput
                                label="City *"
                                value={formData.city}
                                onChange={handleCityChange}
                            />
                        </div>
                        <div className="col-12">
                            <DateInput
                                label="Birthday"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <NationalityInput
                                label="Nationality *"
                                value={formData.nationality}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-dark btn-sm w-100 p-2"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

           

            <div className='mt-4 d-flex justify-content-center'>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleFailure}
                    cookiePolicy="single_host_origin"
                    theme="outline"
                    />
            {/* <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/google-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Google</h5>
            </div>

            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/fb-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Facebook</h5>
            </div> */}
        </div>

        <div className='text-center mt-4'>
            <h6 className='text-body-tertiary'>Already have an account ?<span style={{cursor:'pointer'}} onClick={()=>navigate('/')} className='text-black'>Log in</span></h6>
        </div>

        </div>



    </div>
  )
}

export default SignupPage