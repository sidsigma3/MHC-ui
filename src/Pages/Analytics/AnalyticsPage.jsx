import React , {useState , useEffect} from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DateFilter from '../../Components/DateFilter/DateFilter';
import TopSalesExecutiveChart from './Graphs/TopSalesExecutive';
import PrimarySalesAmount from './Graphs/PrimarySalesAmount';
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import AverageVisitsGraph from './Graphs/AverageVistsGraph';
import { IoMdArrowUp } from "react-icons/io";
import { getAllSurveys } from '../../Services/Api';
import CircularProgress from '@mui/material/CircularProgress';

const AnalyticsPage = () => {

    const navigate = useNavigate();
    const [surveyData, setSurveyData] = useState([]);
    const [activePage, setActivePage] = useState("analytics");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

       useEffect(() => {
            const fetchAllSurveyData = async () => {
              try {
                setLoading(true);
                setError(null);
          
              
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

    
       if (loading) {
           return (
             <div
               style={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: '100vh', // Full viewport height
               }}
             >
               <CircularProgress />
             </div>
           );
         }
    //   if (error) return <p>Error: {error}</p>;

    const handleSelect = (status) => {
      setSelectedStatus(status);
       
    };

    const visitsData = surveyData.length > 0 ? surveyData.map((survey) => {
      const date = new Date(survey.createdAt || survey.updatedAt);
      const day = date.toLocaleString('en-IN', { weekday: 'short' }); 
  
      return {
        day,
        numDoctorsVisited: survey.numDoctorsVisited || 0, 
        doctorsCallAvg: survey.doctorsCallAvg || 0,
      };
    }) : []; 


    const handleNavigate = (type) => {
      navigate(`/details/${type}`, { state: { surveyData, visitsData } });
  };


  return (
    <div>
         <div className="top d-flex  header w-100 justify-content-between align-items-center">
    
        <h5 className="w-100">Analytics</h5>

         <div className='d-flex justify-content-end '>
              <DateFilter handleSelect={handleSelect} value={selectedStatus}></DateFilter>
            </div>

      </div>

      <div className='content'>

           

            <div className='p-3'>
                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'  onClick={() => handleNavigate("topSalesExecutives")}>

                    <h4>Top 5 sales executives</h4>
                    <div className='flex-grow-1'>
                    <TopSalesExecutiveChart surveys={surveyData} ></TopSalesExecutiveChart>
                    </div>
                </div>

                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'   onClick={() => handleNavigate("primarySalesAmount")}>

                    <h4>Primary sales amount</h4>
                    <div style={{height:'15rem'}}>
                   <PrimarySalesAmount surveys={surveyData}></PrimarySalesAmount>
                    </div>
                </div>

                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                    <h4>Average Drs. visit in a week</h4>

                    <h3 className='d-flex align-items-center gap-2'>854<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +23%</span></h3>

                    <div className='flex-grow-1'>
                    <AverageVisitsGraph data={visitsData} type={'avgVisits'}></AverageVisitsGraph>
                    </div>
                </div>


                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                <h4>Average Drs. Call</h4>

                <h3 className='d-flex align-items-center gap-2'>148<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +11%</span></h3>

                <div className='flex-grow-1'>
                <AverageVisitsGraph data={visitsData} type={'avgCalls'}></AverageVisitsGraph>
                </div>
                </div>

               

            </div>
      
      
      
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
        
          <MdGroups size={22}/>
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
  )
}

export default AnalyticsPage