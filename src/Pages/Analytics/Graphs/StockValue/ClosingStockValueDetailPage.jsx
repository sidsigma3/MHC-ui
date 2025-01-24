import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import SalesDataTable from './SalesDataTable';
import Navbar from '../../../../Components/Navbar/Navbar';
import TotalPobGraph from '../TotalPob/TotalPobGraph';

const ClosingStockValueDetailPage = () => {

    const { state } = useLocation();
    const { surveyData, stockData } = state;

  return (
    <div>
    <div className='content'>
    <Header></Header>
      <h4 className='p-2'>Closing Stock Value</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
            <TotalPobGraph data={stockData}></TotalPobGraph>
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={stockData} />
      </div>
      <Navbar></Navbar>
    </div>
    </div>
  )
}

export default ClosingStockValueDetailPage