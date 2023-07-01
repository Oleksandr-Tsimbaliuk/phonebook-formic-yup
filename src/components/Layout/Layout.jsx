import AuthNav from 'components/AuthNav/AuthNav';
import Navigation from 'components/Navigation/Navigation';
import UserMenu from 'components/UserMenu/UserMenu';
// import Contacts from 'pages/Contacts';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/authSelectors';

function Layout({ children }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
      {children}
    </>
  );
}

export default Layout;
