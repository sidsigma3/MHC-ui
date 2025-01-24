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
import CircularProgress from '@mui/material/CircularProgress';

const DashboardAdmin = () => {
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState(() => {
      const today = new Date(); // Get today's date in 'YYYY-MM-DD' format
      return (
        JSON.parse(localStorage.getItem('selectedStatus')) || {
          startDate: '',
          endDate: '',
        }
      );
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [surveyData, setSurveyData] = useState(JSON.parse(localStorage.getItem('surveyData'))||[]);
    const [previousSurveyData, setPreviousSurveyData] = useState(JSON.parse(localStorage.getItem('surveyDataPrev'))||[]);
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
  
              let currentStartDate, currentEndDate, prevStartDate, prevEndDate;
              const today = new Date();
  
              const yesterday = new Date(today);
              yesterday.setHours(0, 0, 0, 0); 

             
              const endOfToday = new Date(today);
              endOfToday.setHours(23, 59, 59, 999); 

              currentStartDate = selectedStatus.startDate || yesterday;
              currentEndDate = selectedStatus.endDate || endOfToday;

              prevStartDate = new Date(today);
              prevStartDate.setMonth(prevStartDate.getMonth() - 1); // Set to previous month
              prevStartDate.setDate(1); // Set to the first day of the previous month
              prevEndDate = new Date(today);
              prevEndDate.setMonth(prevEndDate.getMonth() - 1); // Set to previous month
              prevEndDate.setDate(new Date(today.getFullYear(), today.getMonth(), 0).getDate());

              if (currentStartDate === currentEndDate) {
                const newStartDate = new Date(currentStartDate); 
                newStartDate.setDate(newStartDate.getDate() + 1); 
                currentEndDate = newStartDate; 
              }
  
              const currentData =  await getAllSurveys({ startDate: currentStartDate, endDate: currentEndDate });
              
              if (currentData?.message === "No surveys found for the given criteria") { 
                  setSurveyData([]);
                  localStorage.setItem('surveyData', JSON.stringify([]));
              } else {
                  setSurveyData(currentData);
                  localStorage.setItem('surveyData', JSON.stringify(currentData));
                
              }
  
              const prevMonthData = await getAllSurveys({ startDate: prevStartDate, endDate: prevEndDate });
              if (prevMonthData?.message === "No surveys found for the given criteria") {
                  setPreviousSurveyData([]);
                  localStorage.setItem('surveyDataPrev', JSON.stringify([]));
              } else {
                  setPreviousSurveyData(prevMonthData);
                  localStorage.setItem('surveyDataPrev', JSON.stringify(prevMonthData));
              }


  
              // Fetch current month's data
              // const currentData = await getAllSurveys({ startDate: currentStartDate, endDate: currentEndDate });
              // localStorage.setItem('surveyData', JSON.stringify(currentData));
              // // Fetch previous month's data
              // const prevMonthData = await getAllSurveys({ startDate: prevStartDate, endDate: prevEndDate });
              // localStorage.setItem('surveyDataPrev', JSON.stringify(prevMonthData));

              // setSurveyData(currentData);
              // setPreviousSurveyData(prevMonthData);




              setLoading(false);
          } catch (error) {
              setError(error.message);
              setLoading(false);
          }
      };
  
      fetchAllSurveyData();
  }, [selectedStatus]);
    

    const calculatePercentageChange = (currentValue, previousValue) => {
      if (!previousValue || previousValue === 0) return 0;
      return ((currentValue - previousValue) / previousValue) * 100;
  };

  const numDoctorsVisited = (surveyData && surveyData.length > 0)
    ? surveyData.reduce((acc, survey) => acc + (survey.doctorsInfo ? survey.doctorsInfo.length : 0), 0)
    : 0;

    const numDoctorsVisitedPrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + (survey.doctorsInfo ? survey.doctorsInfo.length : 0), 0)
        : 0;

    const percentChangeDoctorsVisited = calculatePercentageChange(numDoctorsVisited, numDoctorsVisitedPrev);

    const numChemistsVisited = (surveyData && surveyData.length > 0)
        ? surveyData.reduce((acc, survey) => acc + (survey.chemistsInfo ? survey.chemistsInfo.length : 0), 0)
        : 0;

    const numChemistsVisitedPrev = (previousSurveyData && previousSurveyData.length > 0)
        ? previousSurveyData.reduce((acc, survey) => acc + (survey.chemistsInfo ? survey.chemistsInfo.length : 0), 0)
        : 0;

    const percentChangeChemistsVisited = calculatePercentageChange(numChemistsVisited, numChemistsVisitedPrev);

  const totalPOB = surveyData.length > 0
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.totalPOB || 0), 0)
      : 0;

  const totalPOBPrev = previousSurveyData.length > 0
      ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.totalPOB || 0), 0)
      : 0;

  const percentChangePOB = calculatePercentageChange(totalPOB, totalPOBPrev);

  const monthlyPrimarySale = surveyData.length > 0
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.monthlyPrimarySale || 0), 0)
      : 0;

  const monthlyPrimarySalePrev = previousSurveyData.length > 0
      ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.monthlyPrimarySale || 0), 0)
      : 0;

  const percentChangeMonthlyPrimarySale = calculatePercentageChange(monthlyPrimarySale, monthlyPrimarySalePrev);

  const monthlySecondarySale = surveyData.length > 0
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.secondarySales || 0), 0)
      : 0;

  const monthlySecondarySalePrev = previousSurveyData.length > 0
      ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.secondarySales || 0), 0)
      : 0;

  const percentChangeMonthlySecondarySale = calculatePercentageChange(monthlySecondarySale, monthlySecondarySalePrev);

  const closingStockValue = surveyData.length > 0
      ? surveyData.reduce((acc, survey) => acc + parseFloat(survey.closingStockValue || 0), 0)
      : 0;

  const closingStockValuePrev = previousSurveyData.length > 0
      ? previousSurveyData.reduce((acc, survey) => acc + parseFloat(survey.closingStockValue || 0), 0)
      : 0;

  const percentChangeClosingStockValue = calculatePercentageChange(closingStockValue, closingStockValuePrev);

    
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


   
      //   if (error) return <p>Error: {error}</p>;
    

      const handleSelect = (status) => {
        setSelectedStatus(status);
        localStorage.setItem('selectedStatus', JSON.stringify(status));
         
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
           
        </div>

          <div className='mt-4'>
        <DateFilter handleSelect={handleSelect} value={selectedStatus}></DateFilter>
        </div>

        {loading ? (
       
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

        <div className='pt-3'>

        <div className='mt-3'>
               <DashboardBox
                  text="Total Doctors Visited"
                  number={numDoctorsVisited}
                  desc={`${
                      percentChangeDoctorsVisited > 0
                          ? `+${percentChangeDoctorsVisited.toFixed(2)}%`
                          : `${percentChangeDoctorsVisited.toFixed(2)}%`
                  }`}
                  color={percentChangeDoctorsVisited > 0 ? 'green' : 'red'}
              />
        </div>

        <div className='mt-3'>
           <DashboardBox
                text="Total Chemist Visited"
                number={numChemistsVisited}
                desc={`${
                    percentChangeChemistsVisited > 0
                        ? `+${percentChangeChemistsVisited.toFixed(2)}%`
                        : `${percentChangeChemistsVisited.toFixed(2)}%`
                }`}
                color={percentChangeChemistsVisited > 0 ? 'green' : 'red'}
            />
        </div>

        <div className='mt-3'>
              <DashboardBox
                text="Total POB"
                number={totalPOB}
                desc={`${
                    percentChangePOB > 0
                        ? `+${percentChangePOB.toFixed(2)}%`
                        : `${percentChangePOB.toFixed(2)}%`
                }`}
                color={percentChangePOB > 0 ? 'green' : 'red'}
            />
        </div>

        <div className='mt-3'>
               <DashboardBox
                  text="Monthly Primary Sales"
                  number={monthlyPrimarySale}
                  desc={`${
                      percentChangeMonthlyPrimarySale > 0
                          ? `+${percentChangeMonthlyPrimarySale.toFixed(2)}%`
                          : `${percentChangeMonthlyPrimarySale.toFixed(2)}%`
                  }`}
                  color={percentChangeMonthlyPrimarySale > 0 ? 'green' : 'red'}
              />
        </div>

        <div className='mt-3'>
               <DashboardBox
                  text="Monthly Secondary Sales"
                  number={monthlySecondarySale}
                  desc={`${
                      percentChangeMonthlySecondarySale > 0
                          ? `+${percentChangeMonthlySecondarySale.toFixed(2)}%`
                          : `${percentChangeMonthlySecondarySale.toFixed(2)}%`
                  }`}
                  color={percentChangeMonthlySecondarySale > 0 ? 'green' : 'red'}
              />
        </div>

        <div className='mt-3'>
                <DashboardBox
                  text="Closing Stock Value"
                  number={closingStockValue}
                  desc={`${
                      percentChangeClosingStockValue > 0
                          ? `+${percentChangeClosingStockValue.toFixed(2)}%`
                          : `${percentChangeClosingStockValue.toFixed(2)}%`
                  }`}
                  color={percentChangeClosingStockValue > 0 ? 'green' : 'red'}
              />
        </div>
        </div>

        </>)}
        
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