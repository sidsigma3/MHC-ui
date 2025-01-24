import React from 'react';
import { Table } from 'react-bootstrap'; // Assuming react-bootstrap is used for styling

const SalesDataTable = ({ data }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Survey</th>
        <th>Stock Value</th>
        </tr>
      </thead>
      <tbody>
      {data.map((data, index) => (
            <tr key={index}>
            <td>{data.surveyId}</td>
            <td>{data.value}</td>
            </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SalesDataTable;
