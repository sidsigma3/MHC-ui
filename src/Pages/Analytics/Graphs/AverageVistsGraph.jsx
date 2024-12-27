import React, { useRef, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const AverageVisitsGraph = ({data,type}) => {

  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const preprocessData = (data) => {
    const dayMap = {
      Mon: { totalVisits: 0, totalCalls: 0, count: 0 },
      Tue: { totalVisits: 0, totalCalls: 0, count: 0 },
      Wed: { totalVisits: 0, totalCalls: 0, count: 0 },
      Thu: { totalVisits: 0, totalCalls: 0, count: 0 },
      Fri: { totalVisits: 0, totalCalls: 0, count: 0 },
      Sat: { totalVisits: 0, totalCalls: 0, count: 0 },
      Sun: { totalVisits: 0, totalCalls: 0, count: 0 },
    };
  
    // Group data by day and aggregate visits
    data.forEach((entry) => {
      const { day, numDoctorsVisited, doctorsCallAvg } = entry;
  
      if (dayMap[day]) {
        dayMap[day].totalVisits += numDoctorsVisited;
        dayMap[day].totalCalls += parseFloat(doctorsCallAvg);
        dayMap[day].count += 1;
      }
    });
  
    // Calculate averages
    return Object.keys(dayMap).map((day) => ({
      day,
      avgVisits: dayMap[day].count > 0 ? dayMap[day].totalVisits / dayMap[day].count : 0,
      avgCalls: dayMap[day].count > 0 ? dayMap[day].totalCalls / dayMap[day].count : 0,
    }));
  };
  
  const visitsData = preprocessData(data);
  console.log(visitsData)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: visitsData.map((data) => data.day),
        datasets: [
          {
            label: "Average Visits",
            data: visitsData.map((data) => data[type]),
            backgroundColor: "#3E4042", // Medium dark color
            barThickness: 18,
            borderRadius: 10, // Rounded edges
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: "#000", // Legend text color
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.raw} visits`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#000",
            },
          },
          y: {
            display: false, // Hide the Y-axis completely
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [visitsData]);

  const handleClick = () => {
    navigate("/graph-detail", {
      state: {
        visitsData: visitsData, // Data for the graph
        tableHeaders: ["Day", "Visits"], // Table headers
        tableRows: visitsData.map((data) => [data.day, data.visits]), // Table rows based on visitsData
        text: "Average Weekly Visits", // Title for the page
        chartType: "bar", // Chart type
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#000",
              },
            },
            y: {
              display: false, // Hide the Y-axis completely
            },
          },
        },
      },
    });
  };


  return (
    <div onClick={handleClick} style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AverageVisitsGraph;
