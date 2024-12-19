import React, { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);


const PrimarySalesAmount = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const salesData = [
    { range: "100k+", amount: 150000 },
    { range: "60k~79k", amount: 70000 },
    { range: "40k~59k", amount: 50000 },
    { range: "20k~39k", amount: 25000 },
  ];

  const chartData = {
    labels: salesData.map((data) => data.range),
    datasets: [
      {
        data: salesData.map((data) => data.amount),
        backgroundColor: salesData.map((_, index) => {
          const opacity = 0.8 - (0.2 * index); // Darker black for larger amounts
          return `rgba(0, 0, 0, ${opacity})`;
        }),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#000", // Black legend text
          boxWidth: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const range = context.label;
            const amount = context.raw.toLocaleString();
            return `${range}: $${amount}`;
          },
        },
      },
      title: {
        display: false,
        text: "Primary Sales Amount Distribution",
        color: "#000",
        font: {
          size: 16,
        },
      },
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "pie", // Pie chart type
      data: chartData,
      options: chartOptions,
    });
  }, [chartData, chartOptions]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PrimarySalesAmount;
