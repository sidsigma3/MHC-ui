import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import SalesDataTable from './SalesDataTable'; // Import your table component
import TopSalesExecutiveChart from "../TopSalesExecutive";
import { useLocation } from "react-router-dom";
import Header from "../../../../Components/Header/Header";
import Navbar from "../../../../Components/Navbar/Navbar";

const TopSalesExecutiveDetailPage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { state } = useLocation();
  const { surveyData } = state; 

  const getAggregatedSalesData = () => {
    const aggregatedData = surveyData.reduce((acc, survey) => {
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

    return Object.values(aggregatedData).sort((a, b) => b.sales - a.sales); // Sort by sales descending
  };

  const salesData = getAggregatedSalesData();
 
  return (
    <div className="content">
        <Header></Header>
      <h4 className="p-3">Top 5 Sales Executives</h4>
      <div className="p-2">
      <div style={{ width: '100%', height: '300px' }} className='p-3 border rounded mb-2'>
        <TopSalesExecutiveChart surveys={surveyData}></TopSalesExecutiveChart>
      </div>
      </div>
      <div className="p-2">
      <SalesDataTable data={salesData} /> 
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default TopSalesExecutiveDetailPage;
