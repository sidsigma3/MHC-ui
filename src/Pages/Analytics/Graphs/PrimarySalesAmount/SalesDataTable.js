import React from 'react';
import { Table } from 'react-bootstrap'; // Assuming react-bootstrap is used for styling

const SalesDataTable = ({ data }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
            <tr>
              <th>Range</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
                <td>{data.range}</td>
                <td>{data.count}</td>
              </tr>
            ))}
          </tbody>
    </Table>
  );
};

export default SalesDataTable;
