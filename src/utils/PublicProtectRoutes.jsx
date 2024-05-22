import React from "react";
import { useSelector } from "react-redux";
import { Navigate , useLocation } from "react-router-dom";

// Higher-order component for protected routes

const ProtectedRoute = ({ element: Component }) => {
    const token = useSelector(state => state.LoginReducer?.data?.data?.api_token);
    const location = useLocation();
  
    if (token) {
      return <Component />;
    } else {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  };

// Higher-order component for public routes
const PublicRoute = ({ element: Component }) => {
  return <Component />;
};

export { ProtectedRoute, PublicRoute };
