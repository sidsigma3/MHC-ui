import React from 'react'



const DashboardBox = ({text,number,desc}) => {
  return (
    <div className='rounded shadow-sm p-3 border'>
        <h5 style={{fontSize:'0.9rem'}} className='text-secondary'>{text}</h5>
        <h4>{number}</h4>
        <h6>{desc}</h6>
    </div>
  )
}

export default DashboardBox