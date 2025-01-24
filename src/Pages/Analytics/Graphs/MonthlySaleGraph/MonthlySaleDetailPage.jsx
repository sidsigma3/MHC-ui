import React from 'react'
import MonthlySalesGraph from './MonthlySalesGraph'
import { useLocation } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import SalesDataTable from './SalesDataTable';
import Navbar from '../../../../Components/Navbar/Navbar';

const MonthlySaleDetailPage = () => {

    const { state } = useLocation();
    const { surveyData, primarySalesData } = state;



  return (
    <div className='content'>
    <Header></Header>
      <h4 className='p-2'>Monthly Primary Sale</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
            <MonthlySalesGraph data={primarySalesData}></MonthlySalesGraph>
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={primarySalesData} />
      </div>
      <Navbar></Navbar>
    </div>
  )
}

export default MonthlySaleDetailPage