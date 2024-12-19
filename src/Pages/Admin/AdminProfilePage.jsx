import React ,{useState}from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import InputField from '../../Components/Inputs/InputField';


const AdminProfilePage = () => {

    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('profile')


    const handleActivePage = (page) => {
        setActivePage(page)

        if (page ==='profile'){
            navigate('/admin-profile')
        }

        else if (page ==='dashboard'){
            navigate('/dashboard')
        }

        else if (page ==='analytics'){
            navigate('/analytics')
        }

        else{
            navigate('/teams')
        }

    }





  return (  
    <div className='h-100  overflow-hidden '>
        <div className='top d-flex  mt-2 header' onClick={()=>navigate('/dashboard')}>
            <span className='left-0 position-absolute'><IoMdArrowBack /></span>

            <h5 className='text-center w-100'>Profile</h5>
        </div>

        <div className='content'>

        <div className='text-center mt-3'>
            <img src='./images/avatar.png'></img>
            <h4>Jane Skiter</h4>
            <h6 className='text-body-tertiary'>Hyderabad,India</h6>
        </div>

        <div  className='p-3 row row-gap-3'>
            <div className='col-6'>
                <InputField text={'First name *'}></InputField>
            </div>

            <div className='col-6'>
                <InputField text={'Last name *'}></InputField>
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
            onClick={() => handleActivePage('dashboard')}
            className="border border-0 bg-transparent p-1 w-25"
            style={{ color: activePage === 'dashboard' ? 'black' : '#ACB5BB' }}
            >
            <AiFillHome />
            </button>
         
            <button
                onClick={() => handleActivePage('teams')}
                className="border border-0 bg-transparent p-1 w-25"
                style={{ color: activePage === 'teams' ? 'black' : '#ACB5BB' }}
            > <MdGroups /></button>

            <button
                onClick={() => handleActivePage('analytics')}
                className="border border-0 bg-transparent p-1 w-25"
                style={{ color: activePage === 'analytics' ? 'black' : '#ACB5BB' }}
            ><RiBarChartFill /></button>

           
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

export default AdminProfilePage