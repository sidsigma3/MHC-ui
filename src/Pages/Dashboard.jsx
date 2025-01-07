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
    const [selectedStatus, setSelectedStatus] = useState(
        JSON.parse(localStorage.getItem('selectedStatus'))|| 
        {
        startDate: '',
        endDate: ''
        }
        );

    

    const [surveyData, setSurveyData] = useState(JSON.parse(localStorage.getItem('surveyData'))||[]);
    const [previousSurveyData, setPreviousSurveyData] = useState(JSON.parse(localStorage.getItem('surveyDataPrev'))||[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage,setActivePage] = useState('home')


    useEffect(()=>{



    },[selectedStatus])




    useEffect(()=>{
        console.log(selectedStatus)


        const fetchAllSurveyData = async () => {
            try {
                setLoading(true);
                setError(null);
                const userId = localStorage.getItem('userId');
                let currentStartDate, currentEndDate, prevStartDate, prevEndDate;
                const today = new Date();
            
          
            currentStartDate = selectedStatus.startDate || today;
            currentEndDate = selectedStatus.endDate || today;
           
            prevStartDate = new Date(today);
            prevStartDate.setMonth(prevStartDate.getMonth() - 1); // Set to previous month
            prevStartDate.setDate(1); // Set to the first day of the previous month
            prevEndDate = new Date(today);
            prevEndDate.setMonth(prevEndDate.getMonth() - 1); // Set to previous month
            prevEndDate.setDate(new Date(today.getFullYear(), today.getMonth(), 0).getDate());
            
            const currentData = await getSurveyById(userId, { startDate: currentStartDate, endDate: currentEndDate });
            
            if (currentData?.message === "No surveys found for the given criteria") { 
                setSurveyData([]);
                localStorage.setItem('surveyData', JSON.stringify([]));
            } else {
                setSurveyData(currentData);
                localStorage.setItem('surveyData', JSON.stringify(currentData));
              
            }

            const prevMonthData = await getSurveyById(userId, { startDate: prevStartDate, endDate: prevEndDate });
            if (prevMonthData?.message === "No surveys found for the given criteria") {
                setPreviousSurveyData([]);
                localStorage.setItem('surveyDataPrev', JSON.stringify([]));
            } else {
                setPreviousSurveyData(prevMonthData);
                localStorage.setItem('surveyDataPrev', JSON.stringify(prevMonthData));
            }

            
            setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchAllSurveyData();
       
    
    },[selectedStatus])
     
   
    //   if (error) return <p>Error: {error}</p>;
    //   if (!surveyData) return <p>No survey data found.</p>;

    const calculatePercentageChange = (currentValue, previousValue) => {
        if (!previousValue || previousValue === 0) return 0;
        return ((currentValue - previousValue) / previousValue) * 100;
    };
    
    const numDoctorsVisited = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.numDoctorsVisited || 0), 0)
        : 0;
    
    const numDoctorsVisitedPrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.numDoctorsVisited || 0), 0)
        : 0;
    
    const percentChangeDoctorsVisited = calculatePercentageChange(numDoctorsVisited, numDoctorsVisitedPrev);
    
    const numChemistsVisited = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.numChemistsVisited || 0), 0)
        : 0;
    
    const numChemistsVisitedPrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.numChemistsVisited || 0), 0)
        : 0;
    
    const percentChangeChemistsVisited = calculatePercentageChange(numChemistsVisited, numChemistsVisitedPrev);
    
    const totalPOB = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.totalPOB || 0), 0)
        : 0;
    
    const totalPOBPrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.totalPOB || 0), 0)
        : 0;
    
    const percentChangePOB = calculatePercentageChange(totalPOB, totalPOBPrev);
    
    const monthlyPrimarySale = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.monthlyPrimarySale || 0), 0)
        : 0;
    
    const monthlyPrimarySalePrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.monthlyPrimarySale || 0), 0)
        : 0;
    
    const percentChangeMonthlyPrimarySale = calculatePercentageChange(monthlyPrimarySale, monthlyPrimarySalePrev);
    
    const closingStockValue = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.closingStockValue || 0), 0)
        : 0;
    
    const closingStockValuePrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.closingStockValue || 0), 0)
        : 0;
    
    const percentChangeClosingStockValue = calculatePercentageChange(closingStockValue, closingStockValuePrev);
    

   

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
      localStorage.setItem('selectedStatus', JSON.stringify(status));
    };



  return (
    <div className='dashboard-page h-100'>
        
        <div className='content' style={{paddingTop:'0'}}>
        <div className='d-flex justify-content-between p-3'>
            <h4 className='d-flex align-items-center'>Dashboard</h4>
          
        </div>

        <div className='p-3'>
        <DateFilter handleSelect={handleSelect} value={selectedStatus}></DateFilter>
        </div>

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
      
    
        <div className='p-3 d-flex flex-column gap-3'>
        <div>
             <DashboardBox
                  text="Total Doctors Visited"
                  number={numDoctorsVisited}
                  desc={`${
                      percentChangeDoctorsVisited > 0
                          ? `+${percentChangeDoctorsVisited.toFixed(2)}%`
                          : `${percentChangeDoctorsVisited.toFixed(2)}%`
                  }`}
                  color={percentChangeDoctorsVisited >= 0 ? 'green' : 'red'}
            />
        </div>

        <div>
              <DashboardBox
                text="Total Chemist Visited"
                number={numChemistsVisited}
                desc={`${
                    percentChangeChemistsVisited > 0
                        ? `+${percentChangeChemistsVisited.toFixed(2)}%`
                        : `${percentChangeChemistsVisited.toFixed(2)}%`
                }`}
                color={percentChangeChemistsVisited >= 0 ? 'green' : 'red'}
            />
        </div>

        <div>
             <DashboardBox
                text="Total POB"
                number={totalPOB}
                desc={`${
                    percentChangePOB > 0
                        ? `+${percentChangePOB.toFixed(2)}%`
                        : `${percentChangePOB.toFixed(2)}%`
                }`}
                color={percentChangePOB >= 0 ? 'green' : 'red'}
            />
        </div>

        <div>
              <DashboardBox
                  text="Monthly Primary Sales"
                  number={monthlyPrimarySale}
                  desc={`${
                      percentChangeMonthlyPrimarySale > 0
                          ? `+${percentChangeMonthlyPrimarySale.toFixed(2)}%`
                          : `${percentChangeMonthlyPrimarySale.toFixed(2)}%`
                  }`}
                  color={percentChangeMonthlyPrimarySale >= 0 ? 'green' : 'red'}
              />
        </div>

        <div>
              <DashboardBox
                  text="Closing Stock Value"
                  number={closingStockValue}
                  desc={`${
                      percentChangeClosingStockValue > 0
                          ? `+${percentChangeClosingStockValue.toFixed(2)}%`
                          : `${percentChangeClosingStockValue.toFixed(2)}%`
                  }`}
                  color={percentChangeClosingStockValue >= 0 ? 'green' : 'red'}
              />
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