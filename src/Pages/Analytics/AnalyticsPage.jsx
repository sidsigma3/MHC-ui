import React , {useState} from 'react'
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

const AnalyticsPage = () => {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState("analytics");
  
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
  return (
    <div>
         <div className="top d-flex  header w-100 justify-content-between">
        <span className="left-0 " onClick={() => navigate("/dashboard")}>
          <IoMdArrowBack size={22} />
        </span>

        <h5 className="text-center">Analytics</h5>

        <button onClick={()=>navigate('/admin-profile')} className="btn btn-dark rounded-circle p-1 d-flex align-items-center">
          <FaPlus size={22} />
        </button>
      </div>

      <div className='content'>

            <div className='d-flex justify-content-end px-3'>
                <DateFilter></DateFilter>
            </div>

            <div className='p-3'>
                <div style={{height:'35vh'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                    <h4>Top 5 sales executives</h4>
                    <div className='flex-grow-1'>
                    <TopSalesExecutiveChart></TopSalesExecutiveChart>
                    </div>
                </div>

                <div style={{height:'35vh'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                    <h4>Primary sales amount</h4>
                    <div style={{height:'28vh'}}>
                   <PrimarySalesAmount></PrimarySalesAmount>
                    </div>
                </div>

                <div style={{height:'35vh'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                    <h4>Average Drs. visit in a week</h4>

                    <h3 className='d-flex align-items-center gap-2'>854<span className='text-success d-flex align-items-center'><span><IoMdArrowUp size={15}/></span> +23%</span></h3>

                    <div className='flex-grow-1'>
                    <AverageVisitsGraph></AverageVisitsGraph>
                    </div>
                </div>


                <div style={{height:'35vh'}} className='p-3 border rounded mb-2 d-flex flex-column'>

                <h4>Average Drs. Call</h4>

                <h3 className='d-flex align-items-center gap-2'>148<span className='text-success d-flex align-items-center'><span><IoMdArrowUp size={15}/></span> +11%</span></h3>

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
          {" "}
          <MdGroups />
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