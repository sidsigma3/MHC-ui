import React ,{useState , useEffect} from 'react'
import DashboardBox from '../Components/DashboardBox/DashboardBox'
import { FaRegBell } from "react-icons/fa";
import { Badge } from '@mui/material';
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import DateFilter from '../Components/DateFilter/DateFilter';
import { getSurveyById } from '../Services/Api';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {

    const navigate = useNavigate()

    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage,setActivePage] = useState('home')
    const [selectedStatus, setSelectedStatus] = useState('Prev Day'); 
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
          const fetchAllSurveyData = async () => {
            try {
              setLoading(true);
              setError(null);
              const userId = localStorage.getItem('userId');
              let startDate, endDate;
              const today = new Date();
        
              // Handle custom date range or preset options
              if (typeof selectedStatus === 'string') {
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
                  case 'All':
                    startDate = null;
                    break;
                  default:
                    startDate = today;
                    endDate = today;
                }
              } else {
                startDate = selectedStatus.startDate; 
                endDate = selectedStatus.endDate;
              }
        
              setDateRange({ startDate, endDate });
        
              const data = await getSurveyById(userId, { startDate, endDate });
              setSurveyData(data);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };
        
          fetchAllSurveyData();
        }, [selectedStatus]);
 

     
    //   if (error) return <p>Error: {error}</p>;
    //   if (!surveyData) return <p>No survey data found.</p>;

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
            navigate('/profile')
        }

        else if (page ==='home'){
            navigate('/home')
        }

        else{
            navigate('/survey')
        }

    }


    const handleSelect = (status) => {
      setSelectedStatus(status);
        console.log('hello')
    };



  return (
    <div className='dashboard-page h-100'>
        
        <div className='content' style={{paddingTop:'0'}}>

        {loading ? (
        // Display loader in place of the content
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (

        <>
        {/* <div className='d-flex p-1 justify-content-between p-3'>
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

        </div> */}

        <div className='d-flex justify-content-between p-3'>
            <h4 className='d-flex align-items-center'>Dashboard</h4>
          
        </div>

        <div className='p-3'>
        <DateFilter handleSelect={handleSelect} value={selectedStatus}></DateFilter>
        </div>

        <div className='p-3 d-flex flex-column gap-3'>
        <div>
            <DashboardBox text={'Total Doctors Visited'} number={numDoctorsVisited} desc={''} />
        </div>

        <div>
            <DashboardBox text={'Total Chemist Visited'} number={numChemistsVisited} desc={''}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Total POB'} number={totalPOB} desc={''}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Monthly Primary Sales'} number={monthlyPrimarySale} desc={''}></DashboardBox>
        </div>

        <div>
            <DashboardBox text={'Closing Stock Value'} number={closingStockValue} desc={''}></DashboardBox>
        </div>
        </div>
        
            </>)}
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