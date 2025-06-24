import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.user);
  const location  = useLocation()
  useEffect(()=>{console.log(location)},
   [])
  return (
    <>
      {userDetails ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
