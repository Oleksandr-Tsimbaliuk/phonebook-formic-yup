import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn, getisRefreshing } from 'redux/auth/authSelectors';

const PrivatRoute = ({ component: Component, redirectTo = '/' }) => {
  const IsLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getisRefreshing);
  return !IsLoggedIn & !isRefreshing ? (
    <Navigate to={redirectTo} />
  ) : (
    <Component />
  );
};

// export default function PrivatRoute({ children, redirectTo = '/' }) {
//   const IsLoggedIn = useSelector(getIsLoggedIn);
//   const isRefreshing = useSelector(getisRefreshing);
//   return !IsLoggedIn & !isRefreshing ? <Navigate to={redirectTo} /> : children;
// }

export default PrivatRoute;
