import React ,{useState} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputField from '../../Components/Inputs/InputField';
import CityInput from '../../Components/Inputs/CityInput';
import DateInput from '../../Components/Inputs/DateInput';
import NationalityInput from '../../Components/Inputs/NationalityInput';
import PasswordInput from '../../Components/Inputs/PasswordInput';

const SignupPage = () => {
    const navigate = useNavigate()

    const [nationality, setNationality] = useState("IN");

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };


  const [city,setCity] = useState({code:'DEL',name:'Delhi'});

  const handleCityChange = (e) => {
    setCity(e)
  }


  return (
    <div className='signup-page p-2'>
        <div className='top p-3' onClick={()=>navigate('/')}>
            <span><IoMdArrowBack size={22}/></span>
        </div>

        <div className='d-flex flex-column align-items-center mt-4'>
            <h4 className='fw-bold fs-1'>Sign up to your Account</h4>
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
                        {/* <InputField text={'Password *'}></InputField> */}
                        <PasswordInput label={'Password'}></PasswordInput>
                    </div>

                    <div className='col-12'>
                        <InputField text={'Phone *'}></InputField>
                    </div>

                    <div className='col-12'>
                        {/* <InputField text={'City'}></InputField> */}
                        <CityInput label={'City'} value={city} onChange={handleCityChange}></CityInput>
                    </div>

                    <div className='col-12'>
                        {/* <InputField text={'Birthday'}></InputField> */}
                        <DateInput label={'Birthday'}></DateInput>
                    </div>

                    <div className='col-12'>
                        {/* <InputField text={'Nationality'}></InputField> */}
                        <NationalityInput label={'Nationality'}></NationalityInput>
                    </div>
            </div>

            <div className='mt-4'>
            <button className='btn btn-dark btn-sm w-100 p-2'>Register</button>
            </div>

            <div className='mt-4'>
            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/google-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Google</h5>
            </div>

            <div className='shadow-sm border border-secondary-subtle rounded d-flex gap-2 justify-content-center mt-2 p-2'>
                <img style={{width:'1.4rem'}} src='./images/fb-logo.png'></img>
                <h5 style={{fontSize:'0.8rem'}}>Continue with Facebook</h5>
            </div>
        </div>

        <div className='text-center mt-4'>
            <h6 className='text-body-tertiary'>Already have an account ?<span onClick={()=>navigate('/')} className='text-black'>Log in</span></h6>
        </div>

        </div>



    </div>
  )
}

export default SignupPage