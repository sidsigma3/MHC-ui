import React, { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);

const PrimarySalesAmount = ({ surveys }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const salesAmounts = surveys.map(survey => Number(survey.monthlyPrimarySale));
  const minAmount = Math.min(...salesAmounts);
  const maxAmount = Math.max(...salesAmounts);

  // Compute range intervals dynamically
  const computeIntervals = (min, max, numIntervals) => {
    const range = max - min;
    const intervalSize = Math.ceil(range / numIntervals);
    let intervals = [min];

    for (let i = 1; i <= numIntervals; i++) {
      intervals.push(min + i * intervalSize);
    }
    return intervals;
  };

  // Generate label for each range
  const getRangeLabel = (amount, intervals) => {
    for (let i = 0; i < intervals.length - 1; i++) {
      if (amount >= intervals[i] && amount < intervals[i + 1]) {
        return `${intervals[i]} - ${intervals[i + 1] - 1}`;
      }
    }
    return `${intervals[intervals.length - 1]}+`; // For amounts above the max interval
  };

  // Compute intervals and categorize sales data
  const intervals = computeIntervals(minAmount, maxAmount, 5);

  const categorizedData = intervals.slice(0, -1).map((start, i) => {
    const end = intervals[i + 1];
    const count = salesAmounts.filter(amount => amount >= start && amount < end).length;
    return { range: `${start} - ${end - 1}`, count };
  });

  // Limit to top 5 categories based on count
  const limitedData = categorizedData.sort((a, b) => b.count - a.count).slice(0, 5);

  const chartData = {
    labels: limitedData.map(data => data.range),
    datasets: [
      {
        data: limitedData.map(data => data.count),
        backgroundColor: limitedData.map((_, index) => {
          const opacity = 0.8 - 0.2 * index; // Darker shades for larger amounts
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
            const count = context.raw;
            return `${range}: ${count} records`;
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
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <canvas ref={chartRef}></canvas>
      </div>
      {/* Table for showing categorized data */}
    
    </>
  );
};

export default PrimarySalesAmount;
