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

  const getSalesData = () => {
    const salesData = surveyData.map(survey => ({
      name: `${survey.firstName} ${survey.lastName}`, // Full name of the executive
      sales: survey.monthlyPrimarySale, // Total primary sales
    }));

    // Sort by monthlyPrimarySale descending
    return salesData.sort((a, b) => b.sales - a.sales); // Top sales descending
  };

  const salesData = getSalesData();

 
  return (
    <div className="content">
        <Header></Header>
      <h4 className="p-3">Top 5 Sales Executives</h4>
      <div style={{ width: '100%', height: '300px' }} className='p-3 border rounded mb-2'>
        <TopSalesExecutiveChart surveys={surveyData}></TopSalesExecutiveChart>
      </div>
      <SalesDataTable data={salesData} /> 
      <Navbar></Navbar>
    </div>
  );
};

export default TopSalesExecutiveDetailPage;
