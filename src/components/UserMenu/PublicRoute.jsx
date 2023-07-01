import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/authSelectors';

const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  const IsLoggedIn = useSelector(getIsLoggedIn);
  return IsLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

// const PublicRoute = ({ children, redirectTo = '/' }) => {
//   const IsLoggedIn = useSelector(getIsLoggedIn);
//   return IsLoggedIn ? <Navigate to={redirectTo} /> : children;
// };

export default PublicRoute;
