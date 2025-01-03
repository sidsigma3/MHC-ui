import React from 'react';
import { useLocation } from 'react-router-dom';
import AverageVisitsGraph from '../AverageVistsGraph';
import SalesDataTable from './SalesDataTable';
import Header from '../../../../Components/Header/Header';
import Navbar from '../../../../Components/Navbar/Navbar';

const AverageCallDetailPage = () => {
  const { state } = useLocation();
  const { surveyData } = state; 

  const visitsData = surveyData.length > 0 ? surveyData.map((survey) => {
    const date = new Date(survey.createdAt || survey.updatedAt);
    const day = date.toLocaleString('en-IN', { weekday: 'short' }); 

    return {
      day,
      numDoctorsVisited: survey.numDoctorsVisited || 0, 
      doctorsCallAvg: survey.doctorsCallAvg || 0,
    };
  }) : []; 

  

  return (
    <div className='content'>
        <Header></Header>
      <h4 className='p-2'>Average Dr. Call</h4>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
        <AverageVisitsGraph data={visitsData} type={'avgCalls'}></AverageVisitsGraph>
      </div>
      <SalesDataTable data={surveyData} />
      <Navbar></Navbar>
    </div>
  );
};

export default AverageCallDetailPage;
