import React , {useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import InputField from '../../Components/Inputs/InputField';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { BsClipboard2CheckFill } from "react-icons/bs";

const ProfilePage = () => {

    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('profile')


    const handleActivePage = (page) => {
        setActivePage(page)

        if (page ==='profile'){
            navigate('/profile')
        }

        else if (page ==='home'){
            navigate('/home')
        }

        else{
            navigate('/survey')
        }

    }

  return (
    <div className="w-100 h-100">
  <div className="header">
    <div className="position-relative" onClick={() => navigate('/survey')}>
      <span className="position-absolute left-0">
        <IoMdArrowBack />
      </span>
      <h5 className="text-center">Profile</h5>
    </div>
  </div>

  <div
    style={{
      paddingTop: '7vh', // Space for the header
      paddingBottom: '7vh', // Space for the footer
      height: '93vh', // Remaining height
      overflowY: 'auto', // Enable scrolling for the content
    }}
    className="profile-page"
  >
    <div className="text-center mt-3">
      <img src="./images/avatar.png" alt="Avatar" />
      <h4>Jane Skiter</h4>
      <h6 className="text-body-tertiary">Hyderabad, India</h6>
    </div>


        <div  className='p-3 row row-gap-3'>
            <div className='col-6'>
                <InputField text={'First name *'}></InputField>
            </div>

            <div className='col-6'>
                <InputField text={'Last name *'}></InputField>
            </div>

            <div className='col-12'>
                <InputField text={'Job profile *'}></InputField>
            </div>

            <div className='col-12'>
                <InputField text={'Email *'}></InputField>
            </div>  

            <div className='col-12'>
                <InputField text={'Password *'}></InputField>
            </div>  

            <div className='col-12'>
                <InputField text={'Phone *'}></InputField>
            </div>  
            
            <div className='col-12'>
                <InputField text={'City *'}></InputField>
            </div>  
            <div className='col-12'>
                <InputField text={'Birthday *'}></InputField>
            </div>  

            <div className='col-12'>
                <InputField text={'Nationality *'}></InputField>
            </div>  

        </div>

        <div className='mt-2 d-flex flex-column gap-2'>
            <button className='btn btn-dark btn-sm w-100'>Update</button>


            <button className='rounded border border-secondary-subtle w-100 bg-white p-1'> <h6 className='text-danger'>Logout</h6></button>
        </div>


     
    </div>

        <div className="footer d-flex justify-content-around">
            <button
            onClick={() => handleActivePage('home')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'home' ? 'black' : '#ACB5BB' }}
            >
            <AiFillHome />
            </button>
            <button
            onClick={() => handleActivePage('survey')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'survey' ? 'black' : '#ACB5BB' }}
            >
            <BsClipboard2CheckFill />
            </button>
            <button
            onClick={() => handleActivePage('profile')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'profile' ? 'black' : '#ACB5BB' }}
            >
            <IoPerson />
            </button>
        </div>
    </div>
  )
}

export default ProfilePage