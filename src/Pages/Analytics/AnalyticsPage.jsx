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
import { MdOutlineFileDownload } from "react-icons/md";

const AnalyticsPage = () => {

    const navigate = useNavigate();
   const [surveyData, setSurveyData] = useState(JSON.parse(localStorage.getItem('surveyDataAnalytics'))||[]);
    const [activePage, setActivePage] = useState("analytics");
    const [selectedStatus, setSelectedStatus] = useState(
           JSON.parse(localStorage.getItem('selectedStatusAnalytics'))|| 
           {
           startDate: '',
           endDate: ''
           }
           );
    
   
       
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
    
      const fetchAllSurveyData = async () => {
        try {
          setLoading(true);
          setError(null);
         
          let currentStartDate, currentEndDate;
          const today = new Date();

      
          currentStartDate = selectedStatus.startDate || today;
          currentEndDate = selectedStatus.endDate || today;

          const currentData = await getAllSurveys({
            startDate: currentStartDate,
            endDate: currentEndDate,
          });
          localStorage.setItem('surveyDataAnalytics', JSON.stringify(currentData));
          setSurveyData(currentData);
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

    
      
    //   if (error) return <p>Error: {error}</p>;

    const handleSelect = (status) => {
      setSelectedStatus(status);
      localStorage.setItem('selectedStatusAnalytics', JSON.stringify(status));
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
    a.download ='survey_data.csv'; // Specify file name
    a.click();
  

    URL.revokeObjectURL(url);
  };


  return (
    <div>
        <div className="top d-flex  header w-100 justify-content-between align-items-center">
    
        <h5 className="w-100">Analytics</h5>

         <button
                className="btn btn-outline-secondary p-0 px-3 py-1 d-flex align-items-center"
                onClick={handleDownloadExcel}
              >
                <MdOutlineFileDownload />
          </button>

      </div>

      


      <div className='content'>
             <div className='p-3'>
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

                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column' onClick={() => handleNavigate("averageDrVists")}>

                    <h4>Average Drs. visit in a week</h4>

                    {/* <h3 className='d-flex align-items-center gap-2'>854<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +23%</span></h3> */}

                    <div className='flex-grow-1'>
                    <AverageVisitsGraph data={visitsData} type={'avgVisits'}></AverageVisitsGraph>
                    </div>
                </div>


                <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column' onClick={() => handleNavigate("averageDrCall")}>

                <h4>Average Drs. Call</h4>

                {/* <h3 className='d-flex align-items-center gap-2'>148<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +11%</span></h3> */}

                <div className='flex-grow-1'>
                <AverageVisitsGraph data={visitsData} type={'avgCalls'}></AverageVisitsGraph>
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