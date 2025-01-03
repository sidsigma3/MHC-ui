import React from 'react';
import { useLocation } from 'react-router-dom';
import PrimarySalesAmount from '../PrimarySalesAmount';
import SalesDataTable from './SalesDataTable'; // Assuming you have a table component for the data
import Navbar from '../../../../Components/Navbar/Navbar';
import Header from '../../../../Components/Header/Header';

const PrimarySalesAmountDetailPage = () => {
  const { state } = useLocation();
  const { surveyData } = state; // Get surveyData from the route state

  const salesAmounts = surveyData.map(survey => Number(survey.monthlyPrimarySale));
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

  const intervals = computeIntervals(minAmount, maxAmount, 5);

  const categorizedData = intervals.slice(0, -1).map((start, i) => {
    const end = intervals[i + 1];
    const count = salesAmounts.filter(amount => amount >= start && amount < end).length;
    return { range: `${start} - ${end - 1}`, count };
  });

  // Limit to top 5 categories based on count
  const limitedData = categorizedData.sort((a, b) => b.count - a.count).slice(0, 5);



  return (
    <div>
        <Header></Header>
        <div className='content'>
      <h4 className='p-2'>Primary Sales Amount Distribution</h4>
      <div className='p-2'>
      <div style={{ width: '100%', height: '400px' }} className='p-3 border rounded mb-2'>
        <PrimarySalesAmount surveys={surveyData} />
      </div>
      </div>
      <div className='p-2'>
      <SalesDataTable data={limitedData} />
      </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default PrimarySalesAmountDetailPage;
