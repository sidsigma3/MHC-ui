import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import SalesDataTable from './SalesDataTable';
import Navbar from '../../../../Components/Navbar/Navbar';
import MonthlySalesGraph from './MonthlySalesGraph';

const SecondarySaleDetailPage = () => {

    const { state } = useLocation();
    const { surveyData, secondarySalesData } = state;


  return (
    <div className='content'>
    <Header></Header>
      <h4 className='p-2'>Monthly Secondary Sale</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
            <MonthlySalesGraph data={secondarySalesData}></MonthlySalesGraph>
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={secondarySalesData} />
      </div>
      <Navbar></Navbar>
    </div>
  )
}

export default SecondarySaleDetailPage