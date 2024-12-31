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
import GraphDetailsPage from './Pages/Analytics/Graphs/GraphDetailsPage';
import DetailsPage from './Pages/Analytics/Graphs/DetailsPage';
import Navbar from './Components/Navbar/Navbar';
import { useState , useEffect } from 'react';

function App() {  

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Update `isAuthenticated` when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    // Add event listener to watch for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
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
                  <Route path="graph-detail" element={<GraphDetailsPage />} />
                  <Route path="/details/:type" element={<DetailsPage />} />
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
