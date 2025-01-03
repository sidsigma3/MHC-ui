import React from 'react';
import { Table } from 'react-bootstrap'; // Assuming react-bootstrap is used for styling

const SalesDataTable = ({ data }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Executive Name</th>
          <th>Monthly Primary Sales</th>
          <th>Doctors Visited</th>
          <th>Chemists Visited</th>
          <th>Average Doctors Call</th>
          <th>Average Chemist Call</th>
          <th>Total POB</th>
        </tr>
      </thead>
      <tbody>
        {data.map((survey, index) => (
          <tr key={index}>
            <td>{survey.firstName} {survey.lastName}</td>
            <td>${survey.monthlyPrimarySale.toLocaleString()}</td>
            <td>{survey.numDoctorsVisited}</td>
            <td>{survey.numChemistsVisited}</td>
            <td>{survey.doctorsCallAvg}</td>
            <td>{survey.chemistCallAvg}</td>
            <td>${survey.totalPOB.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SalesDataTable;
