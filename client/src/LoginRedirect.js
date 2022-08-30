import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const LoginRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("refresh_token")) {
      const { refresh_token } = queryString.parse(window.location.search);
      if (!refresh_token) {
        console.error('no refresh_token found in redirect url');
        navigate('/login');
        return;
      }
      localStorage.setItem("refresh_token",refresh_token);
    }
    navigate('/home');
    
  }, []);
  return <div>Redirecting, please wait...</div>;
};

export default LoginRedirect;