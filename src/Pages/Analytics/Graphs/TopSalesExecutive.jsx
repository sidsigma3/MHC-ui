import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSalesExecutiveChart = ({ surveys }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  const getSalesData = () => {
    const salesData = surveys.map(survey => ({
      name: `${survey.firstName} ${survey.lastName}`, // Full name of the executive
      sales: survey.monthlyPrimarySale, // Total primary sales
      doctorsVisited: survey.numDoctorsVisited,
      chemistsVisited: survey.numChemistsVisited,
      doctorsCallAvg: survey.doctorsCallAvg,
      chemistCallAvg: survey.chemistCallAvg,
      totalPOB: survey.totalPOB,
    }));

    // Sort by monthlyPrimarySale descending
    return salesData.sort((a, b) => b.sales - a.sales); // Top sales descending
  };

  const salesData = getSalesData();

  const chartData = {
    labels: salesData.map((exec) => exec.name), // Executive names as labels
    datasets: [
      {
        label: "Primary Sales",
        data: salesData.map((exec) => exec.sales), // Monthly primary sales data
        backgroundColor: salesData.map((_, index) => {
          // Start with darker shades for top customers
          const opacity = 1 - (0.8 * (index + 1)) / salesData.length;
          return `rgba(0, 0, 0, ${opacity})`; // Black color with varying opacity
        }),
        borderWidth: 1,
        borderRadius: 7,
        barThickness: 25,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y', // Horizontal bar chart
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const execName = context.label;
            const sales = context.raw;
            return `${execName}: $${sales.toLocaleString()}`; // Format sales with commas
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: false,
        },
      },
      y: {
        grid: { display: false },
        title: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy any existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }, [chartData, chartOptions]); // Re-run effect when data or options change

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TopSalesExecutiveChart;
