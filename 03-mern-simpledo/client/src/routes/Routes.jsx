import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '@features/user/userSlice.js';
/* =============================
📦 Custom Imports
============================= */
const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const SignPage = lazy(() => import('../pages/SignPage.jsx'));
const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
const AccountPage = lazy(() => import('../pages/AccountPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));
/* =============================
📦 Component - Routes
============================= */
export default function Routes() {
  const { user } = useSelector(userSelector);
  return useRoutes([
    {
      path: '/',
      element: user ? <Navigate to='/dashboard' replace={true} /> : <HomePage />,
    },
    {
      path: '/sign',
      element: user ? <Navigate to='/dashboard' replace={true} /> : <SignPage />,
    },
    {
      path: '/dashboard',
      element: user ? <DashboardPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/account',
      element: user ? <AccountPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
}
