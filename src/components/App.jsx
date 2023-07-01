import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/authOperations';
import Loader from './Loader/Loader';
import PrivatRoute from './UserMenu/PrivatRoute';
import PublicRoute from './UserMenu/PublicRoute';

const Home = lazy(() => import('pages/Home/Home'));
const RegistrationPage = lazy(() => import('pages/RegistrationPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const Contacts = lazy(() => import('pages/Contacts'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/registration"
            element={
              <PublicRoute
                component={RegistrationPage}
                redirectTo="/Contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute component={LoginPage} redirectTo="/Contacts" />
            }
          />
          <Route
            path="/contacts"
            element={<PrivatRoute component={Contacts} redirectTo="/login" />}
          />
Ф        </Routes>
      </Suspense>
    </Layout>
  );
}
