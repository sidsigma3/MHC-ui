import React, { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);


const PrimarySalesAmount = ({ surveys }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const salesAmounts = surveys.map(survey => survey.monthlyPrimarySale);
  const minAmount = Math.min(...salesAmounts);
  const maxAmount = Math.max(...salesAmounts);

  const computeIntervals = (min, max, numIntervals) => {
    const range = max - min;
    const intervalSize = Math.ceil(range / numIntervals);
    let intervals = [min];

    for (let i = 1; i < numIntervals; i++) {
      intervals.push(min + i * intervalSize);
    }
    intervals.push(max); // add max to complete the range
    return intervals;
  };

  const getRangeLabel = (amount, intervals) => {
    for (let i = 0; i < intervals.length - 1; i++) {
      if (amount >= intervals[i] && amount < intervals[i + 1]) {
        return `${intervals[i]}~${intervals[i + 1] - 1}k`;
      }
    }
    return `${intervals[intervals.length - 1]}+`; // handle overflow
  };

  // Compute range intervals
  const intervals = computeIntervals(minAmount, maxAmount, 4);

  // Generate sales data with computed ranges
  const salesData = surveys.map(survey => {
    const range = getRangeLabel(survey.monthlyPrimarySale, intervals);
    return {
      range,
      amount: survey.monthlyPrimarySale,
    };
  });

  // Function to determine range label based on intervals
 
  // Function to compute intervals dynamically based on data range
 

  const chartData = {
    labels: salesData.map(data => data.range),
    datasets: [
      {
        data: salesData.map(data => data.amount),
        backgroundColor: salesData.map((_, index) => {
          const opacity = 0.8 - (0.2 * index); // Darker shades for larger amounts
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