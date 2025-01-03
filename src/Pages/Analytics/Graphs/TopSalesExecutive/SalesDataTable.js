import React from 'react';

const SalesDataTable = ({ data }) => {
  return (
    <div className="p-3 border rounded mb-2">
      <h4>Sales Data</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Executive Name</th>
            <th>Sales</th>
            <th>Doctors Visited</th>
            <th>Chemists Visited</th>
            <th>Average Doctor Calls</th>
            <th>Average Chemist Calls</th>
            <th>Total POB</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exec, index) => (
            <tr key={index}>
              <td>{exec.name}</td>
              <td>${exec.sales.toLocaleString()}</td>
              <td>{exec.doctorsVisited}</td>
              <td>{exec.chemistsVisited}</td>
              <td>{exec.doctorsCallAvg}</td>
              <td>{exec.chemistCallAvg}</td>
              {/* <td>${exec.totalPOB.toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDataTable;
