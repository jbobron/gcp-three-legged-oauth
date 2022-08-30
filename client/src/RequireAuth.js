import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("refresh_token")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
