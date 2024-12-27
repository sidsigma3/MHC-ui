import React ,{useState , useEffect} from 'react'
import DashboardBox from '../../Components/DashboardBox/DashboardBox'
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import DateFilter from '../../Components/DateFilter/DateFilter';
import { getUsers } from '../../Services/Api';
import { getAllSurveys } from '../../Services/Api';

const DashboardAdmin = () => {
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState("All"); // Default filter
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [surveyData, setSurveyData] = useState([]);
    const [activePage,setActivePage] = useState('dashboard')
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchAllSurveyData = async () => {
          try {
            setLoading(true);
            setError(null);
      
            // Calculate date range based on selected status
            let startDate, endDate;
            const today = new Date();
      
            switch (selectedStatus) {
              case 'Prev Day':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 1);
                break;
              case 'Prev Week':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                break;
              case 'Prev Month':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 1);
                break;
              case 'Prev Quarter':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 3);
                break;
              case 'Prev Year':
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                break;
              case 'All': // New case for fetching all data
                startDate = null; // No start date restriction
                break;
              default:
                startDate = today;
                endDate = today;
            }
      
            setDateRange({ startDate, endDate });
      
            // Fetch all survey data in a single API call
            const data = await getAllSurveys({ startDate, endDate });
      
            setSurveyData(data); // Set the fetched data to state
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
      
        fetchAllSurveyData();
      }, [selectedStatus]);

      const numDoctorsVisited = surveyData && surveyData.length > 0 
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.numDoctorsVisited || 0), 0)
      : 0;
  
  const numChemistsVisited = surveyData && surveyData.length > 0 
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.numChemistsVisited || 0), 0)
      : 0;
  
  const totalPOB = surveyData && surveyData.length > 0 
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.totalPOB || 0), 0)
      : 0;
  
  const monthlyPrimarySale = surveyData && surveyData.length > 0 
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.monthlyPrimarySale || 0), 0)
      : 0;
  
  const closingStockValue = surveyData && surveyData.length > 0 
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.closingStockValue || 0), 0)
      : 0;
  
    
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


   
    
      if (loading) return <p>Loading...</p>;
    //   if (error) return <p>Error: {error}</p>;
    

      const handleSelect = (status) => {
        setSelectedStatus(status);
         
      };
  

  return (
    <div className='dashboard-page p-3'>
        
    
        
        <div className='content' style={{paddingTop:'20px'}}>

      

        {/* <div className='d-flex flex-column '>
            <div className='d-flex gap-2'>
            <h4 className='fw-bold'>Hello John</h4>
            <span><img src='./images/hand-icon.png'></img></span>
            </div>
            <h6 style={{fontSize:'0.8rem'}} className='text-body-tertiary'>Welcome to admin dashboard!</h6>
          
        </div> */}

        <div className='d-flex justify-content-between'>
            <h4 className='d-flex align-items-center'>Dashboard</h4>
            <DateFilter handleSelect={handleSelect} value={selectedStatus}></DateFilter>
        </div>

        <div className='pt-3'>

        <div className='mt-3'>
            <DashboardBox
            text={"Total Doctors Visited"}
            number={numDoctorsVisited}
            desc={"+23% since last month"} // Adjust if needed
            />
        </div>

        <div className='mt-3'>
            <DashboardBox
            text={"Total Chemist Visited"}
            number={numChemistsVisited}
            desc={"+23% since last month"}
            />
        </div>

        <div className='mt-3'>
            <DashboardBox
            text={"Total POB"}
            number={totalPOB}
            desc={"+09% since last month"}
            />
        </div>

        <div className='mt-3'>
            <DashboardBox
            text={"Monthly Primary Sales"}
            number={monthlyPrimarySale}
            desc={"+14% since last month"}
            />
        </div>

        <div className='mt-3'>
            <DashboardBox
            text={"Closing Stock Value"}
            number={closingStockValue}
            desc={"-13% since last month"}
            />
        </div>
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
        
    </div>
  )
}

export default DashboardAdmin