import React, { useRef, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";


Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const MonthlySalesGraph = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    const preprocessData = (data) => {
      return data.map((entry) => ({
        surveyId: `Survey ${entry.surveyId}`,
        monthlyPrimarySale: parseFloat(entry.sales),
      }));
    };
  
    const primarySalesData = preprocessData(data);
  
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const ctx = chartRef.current.getContext("2d");
  
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: primarySalesData.map((item) => item.surveyId),
          datasets: [
            {
              label: "Monthly Primary Sale",
              data: primarySalesData.map((item) => item.monthlyPrimarySale),
              backgroundColor: "#3E4042",
              barThickness: 18,
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`,
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
              ticks: {
                color: "#000",
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });
  
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [primarySalesData]);
  
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };
  

export default MonthlySalesGraph;


