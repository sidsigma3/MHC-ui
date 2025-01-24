import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import SalesDataTable from './SalesDataTable';
import Navbar from '../../../../Components/Navbar/Navbar';
import TotalPobGraph from './TotalPobGraph';

const TotalPobDetailPage = () => {

    const { state } = useLocation();
    const { surveyData, totalPobData } = state;


  return (
    <div className='content'>
    <Header></Header>
      <h4 className='p-2'>Total POB</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
            <TotalPobGraph data={totalPobData}></TotalPobGraph>
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={totalPobData} />
      </div>
      <Navbar></Navbar>
    </div>
  )
}

export default TotalPobDetailPage