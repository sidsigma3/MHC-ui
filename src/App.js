import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './Pages/Login/LoginPage';
import SignupPage from './Pages/Signup/SignupPage';
import SurveyPage from './Pages/Survey/SurveyPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import Dashboard from './Pages/Dashboard';
import DashboardAdmin from './Pages/Admin/DashboardAdmin';
import AdminProfilePage from './Pages/Admin/AdminProfilePage';
import TeamsPage from './Pages/Admin/TeamsPage';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}></Route>
        <Route path='/signUp' element={<SignupPage></SignupPage>}></Route>
        <Route path='/survey' element={<SurveyPage></SurveyPage>}></Route>
        <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
        <Route path='/dashboard' element={<DashboardAdmin></DashboardAdmin>}></Route>
        <Route path='/home' element={<Dashboard></Dashboard>}></Route>
        <Route path='/admin-profile' element={<AdminProfilePage></AdminProfilePage>}></Route>
        <Route path='/teams' element={<TeamsPage></TeamsPage>}></Route>
        <Route path='/analytics' element={<AnalyticsPage></AnalyticsPage>}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
