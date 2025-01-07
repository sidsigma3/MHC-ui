import React , {useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AverageVisitsGraph from "../Analytics/Graphs/AverageVistsGraph";
import { IoMdArrowBack } from "react-icons/io";
import DateFilter from "../../Components/DateFilter/DateFilter";
import DashboardBox from "../../Components/DashboardBox/DashboardBox";
import { IoMdArrowUp } from "react-icons/io";
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { getSurveyById } from "../../Services/Api";
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineFileDownload } from "react-icons/md";
// import { Line } from "react-chartjs-2";

const TeamDetailsPage = () => {
  const navigate = useNavigate();
  const { state} = useLocation(); 
  const [surveyData, setSurveyData] = useState([]);
  const [previousSurveyData, setPreviousSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(
         JSON.parse(localStorage.getItem('selectedStatus'))|| 
         {
         startDate: '',
         endDate: ''
         }
         );
 

  useEffect(()=>{
       
          const fetchAllSurveyData = async () => {
              try {
                  setLoading(true);
                  setError(null);
                  const userId = state;
                  if (!userId) {
                    throw new Error('User ID is not available in localStorage');
                  }
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
              } else {
                  setSurveyData(currentData);
                  localStorage.setItem('surveyData', JSON.stringify(currentData));
                
              }
  
              const prevMonthData = await getSurveyById(userId, { startDate: prevStartDate, endDate: prevEndDate });
              if (prevMonthData?.message === "No surveys found for the given criteria") {
                  setPreviousSurveyData([]);
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
  
    const visitsData = surveyData.length > 0 ? surveyData.map((survey) => {
    const date = new Date(survey.createdAt || survey.updatedAt);
    const day = date.toLocaleString('en-IN', { weekday: 'short' }); 

    return {
      day,
      numDoctorsVisited: survey.numDoctorsVisited || 0, 
      doctorsCallAvg: survey.doctorsCallAvg || 0,
    };
  }) : []; 
  
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

  
    const [activePage, setActivePage] = useState("teams");
  
    const [filterOption, setFilterOption] = useState("District");
  
    const handleActivePage = (page) => {
      setActivePage(page);
  
      if (page === "profile") {
        navigate("/admin-profile");
      } else if (page === "dashboard") {
        navigate("/dashboard");
      } else if (page === "analytics") {
        navigate("/analytics");
      } else {
        navigate("/teams");
      }
    };

  const createChartData = (data, label) => ({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: label,
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  const handleSelect = (status) => {
    setSelectedStatus(status);
      console.log('hello')
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(header => row[header]).join(',')).join('\n');
    return [headers.join(','), rows].join('\n');
  };
  

  const handleDownloadExcel = () => {

    if(surveyData.length===0){
      alert('No data to download')
      return
    }
    const csvData = convertToCSV(surveyData);
    const name = surveyData[0].firstName
    // Create a blob and set the URL for download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = name+'_survey_data.csv'; // Specify file name
    a.click();
  

    URL.revokeObjectURL(url);
  };
  
  return (
    <div >
      <div className="top d-flex  header w-100 justify-content-between">
              <span className="left-0 position-absolute" onClick={() => navigate(-1)}>
                <IoMdArrowBack size={22} />
              </span>
      
              <h5 className="text-center w-100">Performance</h5>

              <button
              className="btn btn-outline-secondary p-0 px-3 d-flex align-items-center"
              onClick={handleDownloadExcel}
            >
             <MdOutlineFileDownload />
            </button>
            
        </div>

        <div className="content">

        <div className="p-3">
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

        <div className="p-3">

      

        
    
        <div className='mt-3'>
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

        <div className='mt-3'>
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

        <div className='mt-3'>
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

        <div className='mt-3'>
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

        <div className='mt-3'>
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

        <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column mt-3'>

        <h4>Average Drs. visit in a week</h4>

        {/* <h3 className='d-flex align-items-center gap-2'>854<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +23%</span></h3> */}

        <div className='flex-grow-1'>
        <AverageVisitsGraph data={visitsData} type={'avgVisits'}></AverageVisitsGraph>
        </div>
        </div>


        <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'>

        <h4>Average Drs. Call</h4>

        {/* <h3 className='d-flex align-items-center gap-2'>148<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +11%</span></h3> */}

        <div className='flex-grow-1'>
        <AverageVisitsGraph  data={visitsData} type={'avgCalls'}></AverageVisitsGraph>
        </div>

        </div>
        
        </div>
        
        </>)}
      </div>

          <div className="footer d-flex justify-content-around">
                <button
                  onClick={() => handleActivePage("dashboard")}
                  className="border border-0 bg-transparent p-1 w-25"
                  style={{ color: activePage === "dashboard" ? "black" : "#ACB5BB" }}
                >
                  <AiFillHome />
                </button>
        
                <button
                  onClick={() => handleActivePage("teams")}
                  className="border border-0 bg-transparent p-1 w-25"
                  style={{ color: activePage === "teams" ? "black" : "#ACB5BB" }}
                >
                  <MdGroups size={22} />
                </button>
        
                <button
                  onClick={() => handleActivePage("analytics")}
                  className="border border-0 bg-transparent p-1 w-25"
                  style={{ color: activePage === "analytics" ? "black" : "#ACB5BB" }}
                >
                  <RiBarChartFill />
                </button>
        
                <button
                  onClick={() => handleActivePage("profile")}
                  className="border border-0 bg-transparent p-1 w-25"
                  style={{ color: activePage === "profile" ? "black" : "#ACB5BB" }}
                >
                  <IoPerson />
                </button>
              </div>


    </div>
  );
};

export default TeamDetailsPage;
