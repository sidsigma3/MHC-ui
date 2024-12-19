import React ,{useState} from 'react'
import DashboardBox from '../../Components/DashboardBox/DashboardBox'
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";


const DashboardAdmin = () => {
    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('dashboard')


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
    <div className='dashboard-page p-3'>
        
        <div className='d-flex flex-column header'>
            <div className='d-flex gap-2'>
            <h4 className='fw-bold'>Hello John</h4>
            <span><img src='./images/hand-icon.png'></img></span>
            </div>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Welcome to admin dashboard!</h6>
          
        </div>

        
        <div className='content'>

        <div className='mt-3'>
            <DashboardBox text={'Total Doctors Visited'} number={545} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Total Chemist Visited'} number={741} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Total POB'} number={327} desc={'+09% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Monthly Primary Sales'} number={'544,74.23'} desc={'+14% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Closing Stock Value'} number={'10,102.78'} desc={'-13% since last month'}></DashboardBox>
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

export default DashboardAdmin