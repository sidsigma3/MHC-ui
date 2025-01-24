import React from 'react';
import { Table } from 'react-bootstrap'; // Assuming react-bootstrap is used for styling

const SalesDataTable = ({ data }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
      <tr>
        <th>Day</th>
        <th>Avg Chemists Visits</th>
        </tr>
      </thead>
      <tbody>
      {data.map((data, index) => (
            <tr key={index}>
            <td>{data.day}</td>
            <td>{data.avgVisitsChem}</td>
            </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SalesDataTable;
