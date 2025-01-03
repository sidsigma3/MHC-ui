import React from 'react';

const DashboardBox = ({ text, number, desc ,color }) => {
  // Extract the percentage value and determine its sign
  const percentageMatch = desc.match(/([-+]?\d+)%/); // Matches +14% or -13%
  const percentageValue = percentageMatch ? percentageMatch[1] + '%' : null;

  // Extract the text after the percentage
 

  // Determine color based on the percentage
  const percentageColor = percentageValue && percentageValue.startsWith('-') ? 'red' : 'green';

  return (
    <div className="rounded shadow-sm p-3 border d-flex justify-content-between">
      <div className='d-flex align-items-center'>
      <h5 style={{ fontSize: '0.9rem' }} className="text-secondary">
        {text}
      </h5>
      </div>
      <div style={{width:'40%'}}>
      <h2 style={{fontSize:'1.5rem'}}>{number}</h2>
      {desc.length > 0 ? (
        <h6>
        {/* <span style={{ color: percentageColor }}>{percentageValue}</span>{' '} */}
        <span style={{color:color}}>{desc} </span><span>since last month</span>
      </h6>
      ):(
        <h6></h6>
      )}
      
      </div>
    </div>
  );
};

export default DashboardBox;
