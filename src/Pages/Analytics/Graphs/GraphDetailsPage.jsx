import React, { useEffect ,useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto'; 
import { RiBarChartFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { IoMdArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const GraphDetailsPage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { visitsData, tableHeaders, tableRows, text, chartType, options } = location.state;

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

  useEffect(() => {
    let chartInstance;

    const renderChart = () => {
      const ctx = document.getElementById('chartCanvas').getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: chartType, // Type of chart (e.g., bar, line, etc.)
        data: {
          labels: visitsData.map((data) => data.day),
          datasets: [
            {
              label: 'Average Visits',
              data: visitsData.map((data) => data.visits),
              backgroundColor: '#3E4042', // Customize your colors
              barThickness: 18, // Bar thickness
              borderRadius: 10, // Rounded bar edges
            },
          ],
        },
        options, // Options passed from the previous page
      });
    };

    renderChart();

    // Cleanup
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartType, visitsData, options]);

  return (

    <div>

       <div className="top d-flex  header w-100 justify-content-between">
              <span className="left-0 position-absolute" onClick={() => navigate("/dashboard")}>
                <IoMdArrowBack size={22} />
              </span>
      
              <h5 className="text-center w-100">Analytics</h5>
      
              {/* <button onClick={()=>navigate('/admin-profile')} className="btn btn-dark rounded-circle p-1 d-flex align-items-center">
                <FaPlus size={20} />
              </button> */}
            </div>

      <div className='content'>
        <div className='p-3'>
        <h3>{text}</h3>
        <div className='border rounded p-2'>
        <canvas id="chartCanvas"></canvas>
        </div>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};

export default GraphDetailsPage;
