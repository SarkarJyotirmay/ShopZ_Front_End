import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.user);
  const location = useLocation();

  if (userDetails) {
    // If already logged in, redirect to where they came from, or fallback to "/"
    const redirectTo = location.state?.from?.pathname || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RestrictedRoute;
