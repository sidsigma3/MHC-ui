import React ,{useState} from 'react'
import DashboardBox from '../Components/DashboardBox/DashboardBox'
import { FaRegBell } from "react-icons/fa";
import { Badge } from '@mui/material';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import DateFilter from '../Components/DateFilter/DateFilter';

const Dashboard = () => {

    const navigate = useNavigate()

    const [activePage,setActivePage] = useState('home')


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
    <div className='dashboard-page'>
        
        <div className='content' style={{paddingTop:'0'}}>

        <div className='d-flex p-1 justify-content-between p-3'>
        <div className='d-flex flex-column '>
            <div className='d-flex gap-2'>
            <h4 className='fw-bold'>Hello Jane</h4>
            <span><img src='./images/hand-icon.png'></img></span>
            </div>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Please complete your survey</h6>
        
        </div>

        <div>
            <Badge color="secondary" variant='dot'>
            <FaRegBell size={20}/>
            </Badge>
      
        </div>

        </div>

        <div className='d-flex justify-content-end pe-3'>
            <DateFilter></DateFilter>
        </div>

        <div className='p-3 d-flex flex-column gap-3'>
        <div>
            <DashboardBox text={'Total Doctors Visited'} number={545} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Total Chemist Visited'} number={741} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Total POB'} number={327} desc={'+09% since last month'}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Monthly Primary Sales'} number={'544,74.23'} desc={'+14% since last month'}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Closing Stock Value'} number={'10,102.78'} desc={'-13% since last month'}></DashboardBox>
        </div>
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

export default Dashboard