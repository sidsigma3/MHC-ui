import React from 'react';
import { useLocation } from 'react-router-dom';
import PrimarySalesAmount from '../PrimarySalesAmount';
import SalesDataTable from './SalesDataTable'; // Assuming you have a table component for the data
import Navbar from '../../../../Components/Navbar/Navbar';
import Header from '../../../../Components/Header/Header';

const PrimarySalesAmountDetailPage = () => {
  const { state } = useLocation();
  const { surveyData } = state; // Get surveyData from the route state

  return (
    <div>
        <Header></Header>
        <div className='content'>
      <h4 className='p-2'>Primary Sales Amount Distribution</h4>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
        <PrimarySalesAmount surveys={surveyData} />
      </div>
      <SalesDataTable data={surveyData} />
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default PrimarySalesAmountDetailPage;
