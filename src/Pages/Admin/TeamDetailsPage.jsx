import React , {useState} from "react";
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

// import { Line } from "react-chartjs-2";

const TeamDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    name,
    role,
    totalDoctorsVisited,
    totalChemistsVisited,
    totalPob,
    monthlyPrimarySales,
    closingStockValue,
    avgWeeklyVisits,
    avgDrCalls,
  } = state;
  
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

  

  return (
    <div >
      <div className="top d-flex  header w-100 justify-content-between">
              <span className="left-0 position-absolute" onClick={() => navigate(-1)}>
                <IoMdArrowBack size={22} />
              </span>
      
              <h5 className="text-center w-100">Performance</h5>
            
        </div>

        <div className="content">
        <div className="p-3">

        <div className='d-flex justify-content-end'>
                <DateFilter></DateFilter>
        </div>


    
        <div className='mt-3'>
            <DashboardBox text={'Total Doctors Visited'} number={totalDoctorsVisited} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Total Chemist Visited'} number={totalChemistsVisited} desc={'+23% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Total POB'} number={totalPob} desc={'+09% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Monthly Primary Sales'} number={monthlyPrimarySales} desc={'+14% since last month'}></DashboardBox>
        </div>

        <div className='mt-3'>
            <DashboardBox text={'Closing Stock Value'} number={closingStockValue} desc={'-13% since last month'}></DashboardBox>
        </div>

        <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column mt-3'>

        <h4>Average Drs. visit in a week</h4>

        <h3 className='d-flex align-items-center gap-2'>854<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +23%</span></h3>

        <div className='flex-grow-1'>
        <AverageVisitsGraph></AverageVisitsGraph>
        </div>
        </div>


        <div style={{height:'18rem'}} className='p-3 border rounded mb-2 d-flex flex-column'>

        <h4>Average Drs. Call</h4>

        <h3 className='d-flex align-items-center gap-2'>148<span className='text-success d-flex align-items-center fs-6'><span><IoMdArrowUp size={15}/></span> +11%</span></h3>

        <div className='flex-grow-1'>
        <AverageVisitsGraph></AverageVisitsGraph>
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
