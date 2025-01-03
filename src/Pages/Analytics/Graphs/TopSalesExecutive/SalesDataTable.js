import React from 'react';

const SalesDataTable = ({ data }) => {
  return (
   
     
      <table className="table table-bordered table-striped rounded">
        <thead>
          <tr>
            <th>Executive Name</th>
            <th>Sales</th>
            {/* <th>Doctors Visited</th>
            <th>Chemists Visited</th>
            <th>Average Doctor Calls</th>
            <th>Average Chemist Calls</th>
            <th>Total POB</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((exec, index) => (
            <tr key={index}>
              <td>{exec.name}</td>
              <td>₹{exec.sales.toLocaleString()}</td>
              {/* <td>{exec.doctorsVisited}</td>
              <td>{exec.chemistsVisited}</td>
              <td>{exec.doctorsCallAvg}</td>
              <td>{exec.chemistCallAvg}</td> */}
              {/* <td>${exec.totalPOB.toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
  
  );
};

export default SalesDataTable;
