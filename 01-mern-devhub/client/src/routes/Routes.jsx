import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../features/auth/authSlice.js';
import { Spinner } from '../components/ui/index.js';

/* =============================
📦 Custom Imports
============================= */
const IndexPage = lazy(() => import('../pages/IndexPage.jsx'));
const AuthPage = lazy(() => import('../pages/AuthPage.jsx'));
const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
const CreateProfilePage = lazy(() => import('../pages/CreateProfilePage.jsx'));
const ProfilesPage = lazy(() => import('../pages/ProfilesPage.jsx'));
const EditProfilePage = lazy(() => import('../pages/EditProfilePage.jsx'));
const AddExperiencePage = lazy(() => import('../pages/AddExperiencePage.jsx'));
const AddEducationPage = lazy(() => import('../pages/AddEducationPage.jsx'));
const ProfilePage = lazy(() => import('../pages/ProfilePage.jsx'));
const PostsPage = lazy(() => import('../pages/PostsPage.jsx'));
const PostPage = lazy(() => import('../pages/PostPage.jsx'));

/* =============================
📦 Component - Routes
============================= */
export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: '/create-profile',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <CreateProfilePage />,
        },
      ],
    },
    {
      path: '/edit-profile',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <EditProfilePage />,
        },
      ],
    },
    {
      path: '/add-experience',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <AddExperiencePage />,
        },
      ],
    },
    {
      path: '/add-education',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <AddEducationPage />,
        },
      ],
    },
    {
      path: '/profiles',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <ProfilesPage />,
        },
      ],
    },
    {
      path: '/profile/:id',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: '/posts',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <PostsPage />,
        },
      ],
    },
    {
      path: '/post/:id',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <PostPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/' replace={true} />,
    },
  ]);
}

function ProtectedRoute() {
  const { isAuth, status } = useSelector(authSelector.all);
  if (status === 'loading') return <Spinner />;
  return isAuth ? <Outlet /> : <Navigate to='/' />;
}
