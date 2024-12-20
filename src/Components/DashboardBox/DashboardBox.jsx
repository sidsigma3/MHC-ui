import React from 'react';

const DashboardBox = ({ text, number, desc }) => {
  // Extract the percentage value and determine its sign
  const percentageMatch = desc.match(/([-+]?\d+)%/); // Matches +14% or -13%
  const percentageValue = percentageMatch ? percentageMatch[1] + '%' : null;

  // Extract the text after the percentage
  const descText = desc.replace(/([-+]?\d+)%/, '').trim();

  // Determine color based on the percentage
  const percentageColor = percentageValue && percentageValue.startsWith('-') ? 'red' : 'green';

  return (
    <div className="rounded shadow-sm p-3 border">
      <h5 style={{ fontSize: '0.9rem' }} className="text-secondary">
        {text}
      </h5>
      <h4>{number}</h4>
      <h6>
        <span style={{ color: percentageColor }}>{percentageValue}</span>{' '}
        <span>{descText}</span>
      </h6>
    </div>
  );
};

export default DashboardBox;
