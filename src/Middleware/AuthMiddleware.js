import { Navigate } from 'react-router-dom';

const AuthMiddleware = (Component) => {
  return (props) => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      return <Navigate to="/login" replace />; // Redirect to login page if token is not found
    }

    return <Component {...props} />; // Render the protected component if token exists
  };
};

export default AuthMiddleware;
