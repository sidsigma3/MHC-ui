import React, { useRef, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const TotalPobGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const preprocessData = (data) => {
    return data.map((entry) => ({
      surveyId: `Survey ${entry.surveyId}`, // Label each survey
      totalPOB: parseFloat(entry.value), // Convert POB to number
    }));
  };
  
  const pobData = preprocessData(data);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous instance
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: pobData.map((item) => item.surveyId),
        datasets: [
          {
            label: "Total POB",
            data: pobData.map((item) => item.totalPOB),
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
            display: false, // Hide legend
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
              color: "#000", // X-axis labels color
            },
          },
          y: {
            ticks: {
              color: "#000", // Y-axis labels color
            },
            grid: {
              display: false, // Hide Y-axis grid
            },
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
  }, [pobData]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TotalPobGraph;
