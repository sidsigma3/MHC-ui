import React , {useState} from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";


const Navbar = () => {

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
                > <MdGroups size={22}/></button>
    
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
  )
}

export default Navbar