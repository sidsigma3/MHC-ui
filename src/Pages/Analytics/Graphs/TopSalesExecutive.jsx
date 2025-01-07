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

  const getAggregatedSalesData = () => {
    const aggregatedData = surveys.reduce((acc, survey) => {
      const { userId, firstName, lastName, monthlyPrimarySale } = survey;

      if (!acc[userId]) {
        acc[userId] = {
          name: `${firstName} ${lastName}`,
          sales: 0,
        };
      }

      acc[userId].sales += Number(monthlyPrimarySale);
      return acc;
    }, {});

    return Object.values(aggregatedData)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  };

  const salesData = getAggregatedSalesData();

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
    indexAxis: "y", // Horizontal bar chart
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
            return `${execName}: ₹${sales.toLocaleString()}`; // Format sales with commas
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

  // Custom plugin to display data points on bars
  const dataLabelsPlugin = {
    id: "dataLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const value = dataset.data[index];
          ctx.save();
          ctx.font = "12px Arial";
          ctx.fillStyle = "#000"; // Set text color
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const xPos = bar.x + (chart.options.indexAxis === "y" ? -10 : 0); // Adjust position for horizontal chart
          const yPos = bar.y + (chart.options.indexAxis === "y" ? 0 : -10);
          ctx.fillText(`₹${value.toLocaleString()}`, xPos, yPos); // Display value
          ctx.restore();
        });
      });
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
      plugins: [dataLabelsPlugin], // Add custom plugin
    });
  }, [chartData, chartOptions]); // Re-run effect when data or options change

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TopSalesExecutiveChart;
