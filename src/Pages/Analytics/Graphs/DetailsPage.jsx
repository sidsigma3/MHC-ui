import { useParams } from "react-router-dom";
import React from "react";
import TopSalesExecutiveChart from "./TopSalesExecutive";
import PrimarySalesAmount from "./PrimarySalesAmount";
import AverageVisitsGraph from "./AverageVistsGraph";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
    const { state } = useLocation();
    const surveyData = state?.surveyData || [];
    const visitsData = state?.visitsData || [];
  
    const getGraphComponent = () => {
      switch (state?.type) {
        case "topSalesExecutives":
          return <TopSalesExecutiveChart surveys={surveyData} />;
        case "primarySalesAmount":
          return <PrimarySalesAmount surveys={surveyData} />;
        case "avgVisits":
          return <AverageVisitsGraph data={visitsData} type="avgVisits" />;
        case "avgCalls":
          return <AverageVisitsGraph data={visitsData} type="avgCalls" />;
        default:
          return <div>No Data Available</div>;
      }
    };
  
    const getTableContent = () => {
      switch (state?.type) {
        case "topSalesExecutives":
        case "primarySalesAmount":
          return surveyData.map((survey, index) => (
            <tr key={index}>
              <td>{`${survey.firstName} ${survey.lastName}`}</td>
              <td>{survey.monthlyPrimarySale}</td>
            </tr>
          ));
        case "avgVisits":
        case "avgCalls":
          return visitsData.map((visit, index) => (
            <tr key={index}>
              <td>{visit.day}</td>
              <td>{visit[state?.type]}</td>
            </tr>
          ));
        default:
          return (
            <tr>
              <td colSpan="2">No Data Available</td>
            </tr>
          );
      }
    };
  
    return (
      <div className="p-3">
        <div style={{ height: "20rem" }} className="mb-4">
          {getGraphComponent()}
        </div>
        <div className="border rounded p-3">
          <h4>Descriptive Table</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{getTableContent()}</tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default DetailsPage;