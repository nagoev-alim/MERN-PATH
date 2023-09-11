// 🔳 Imports:
import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '@features/user/userSlice.js';
import useAuth from '@/hooks/useAuth.jsx';

// 🔳 Custom Imports:
const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const SignPage = lazy(() => import('../pages/SignPage.jsx'));
const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
const AccountPage = lazy(() => import('../pages/AccountPage.jsx'));
const AddFormPage = lazy(() => import('../pages/AddFormPage.jsx'));
const EditFormPage = lazy(() => import('../pages/EditFormPage.jsx'));
const DetailPage = lazy(() => import('../pages/DetailPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));
const VerifyPage = lazy(() => import('../pages/VerifyPage.jsx'));

// 🟥 Component: Routes
const Routes = () => {
  // 🟨 Variables & Hooks:
  const isLoggedIn = useAuth();

  // 🟪 Rendering:
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <Navigate to='/dashboard' replace={true} /> : <HomePage />,
    },
    {
      path: '/sign',
      element: isLoggedIn ? <Navigate to='/dashboard' replace={true} /> : <SignPage />,
    },
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/account',
      element: isLoggedIn ? <AccountPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/add',
      element: isLoggedIn ? <AddFormPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/edit/:id',
      element: isLoggedIn ? <EditFormPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/detail/:id',
      element: isLoggedIn ? <DetailPage /> : <Navigate to='/sign' replace={true} />,
    },
    {
      path: '/verify/:token',
      element: <VerifyPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default Routes;
