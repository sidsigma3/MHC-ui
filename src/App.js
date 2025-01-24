import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes , Navigate} from 'react-router-dom'
import LoginPage from './Pages/Login/LoginPage';
import SignupPage from './Pages/Signup/SignupPage';
import SurveyPage from './Pages/Survey/SurveyPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import Dashboard from './Pages/Dashboard';
import DashboardAdmin from './Pages/Admin/DashboardAdmin';
import AdminProfilePage from './Pages/Admin/AdminProfilePage';
import TeamsPage from './Pages/Admin/TeamsPage';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import EmailRecovery from './Pages/ForgotPassword/EmailRecovery';
import ResetPassword from './Pages/ForgotPassword/ResetPassword';
import TeamDetailsPage from './Pages/Admin/TeamDetailsPage';
import EditTeamMember from './Pages/Admin/EditTeamMember';

import TopSalesExecutiveDetailPage from './Pages/Analytics/Graphs/TopSalesExecutive/TopSalesExecutiveDetailPage';

import Navbar from './Components/Navbar/Navbar';
import { useState , useEffect } from 'react';
import PrimarySalesAmountDetailPage from './Pages/Analytics/Graphs/PrimarySalesAmount/PrimarySalesAmountDetailPage';
import AverageVistsDetailPage from './Pages/Analytics/Graphs/AverageVisits/AverageVisitsDetailPage';
import AverageCallDetailPage from './Pages/Analytics/Graphs/AverageCall/AverageCallDetailPage';
import MonthlySaleDetailPage from './Pages/Analytics/Graphs/MonthlySaleGraph/MonthlySaleDetailPage';
import SecondarySaleDetailPage from './Pages/Analytics/Graphs/MonthlySaleGraph/SecondarySaleDetailPage';
import TotalPobDetailPage from './Pages/Analytics/Graphs/TotalPob/TotalPobDetailPage';
import ClosingStockValueDetailPage from './Pages/Analytics/Graphs/StockValue/ClosingStockValueDetailPage';

function App() {  

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

  // Update `isAuthenticated` when localStorage changes
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  //   };

  //   // Add event listener to watch for changes in localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const ProtectedRoute = ({ children }) => {

    setIsAuthenticated(localStorage.getItem("isAuthenticated"));

    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage  setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/EnterCode" element={<EmailRecovery />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="layout">
               
                <Routes>
                  <Route path="survey" element={<SurveyPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="dashboard" element={<DashboardAdmin />} />
                  <Route path="home" element={<Dashboard />} />
                  <Route path="admin-profile" element={<AdminProfilePage />} />
                  <Route path="teams" element={<TeamsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="team-details" element={<TeamDetailsPage />} />
                  <Route path="editTeamDetail" element={<EditTeamMember />} />
                
                  <Route path="/details/topSalesExecutives" element={<TopSalesExecutiveDetailPage />} />
                  <Route path="/details/primarySalesAmount" element={<PrimarySalesAmountDetailPage></PrimarySalesAmountDetailPage>} />
                  <Route path="/details/averageDrVists" element={<AverageVistsDetailPage></AverageVistsDetailPage>} />
                  <Route path="/details/averageChemistsVisits" element={<AverageCallDetailPage></AverageCallDetailPage>} />

                  <Route path="/details/primarySales" element={<MonthlySaleDetailPage></MonthlySaleDetailPage>} />
                  <Route path="/details/secondarySales" element={<SecondarySaleDetailPage></SecondarySaleDetailPage>} />
                  <Route path="/details/totalPob" element={<TotalPobDetailPage></TotalPobDetailPage>} />
                  <Route path="/details/stockValue" element={<ClosingStockValueDetailPage></ClosingStockValueDetailPage>} />




                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
