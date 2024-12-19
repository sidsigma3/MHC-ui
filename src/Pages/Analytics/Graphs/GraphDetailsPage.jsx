import React from "react";
import { useLocation } from "react-router-dom";

const GraphDetailsPage = () => {
  const location = useLocation();
  const { component, data, options, tableHeaders, tableRows, text } = location.state;

  return (
    <div style={{ padding: "20px" }}>
      <h3>{text}</h3>
      {component}
      <h4>Details Table</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraphDetailsPage;
