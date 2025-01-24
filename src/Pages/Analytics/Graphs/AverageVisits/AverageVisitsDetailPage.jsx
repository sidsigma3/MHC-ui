import React from 'react';
import { useLocation } from 'react-router-dom';
import AverageVisitsGraph from '../AverageVistsGraph';
import SalesDataTable from './SaleDataTable';
import Header from '../../../../Components/Header/Header';
import Navbar from '../../../../Components/Navbar/Navbar';

const AverageVistsDetailPage = () => {
  const { state } = useLocation();
  const { surveyData } = state; // Get surveyData from the route state

  const visitsData = surveyData.length > 0 ? surveyData.map((survey) => {
    const date = new Date(survey.createdAt || survey.updatedAt);
    const day = date.toLocaleString('en-IN', { weekday: 'short' }); 

    return {
      day,
      numDoctorsVisited: survey.doctorsInfo.length || 0, 
      numChemistsVisted: survey.chemistsInfo.length || 0,
    };
  }) : []; 


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
  
  const visitData = preprocessData(visitsData);


  

  return (
    <div className='content'>
        <Header></Header>
      <h4 className='p-2'>Average Dr. visits in a week</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
        <AverageVisitsGraph data={visitsData} type={'avgVisits'}></AverageVisitsGraph>
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={visitData} />
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default AverageVistsDetailPage;
