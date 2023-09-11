import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/all.js';

/* =============================
📦 Custom Imports
============================= */
import { authSelector } from '../features/auth/authSlice.js';
import { LoginForm, RegisterForm } from '../components/ui/index.js';

/* =============================
📦 Component - AuthPage
============================= */
export default function AuthPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const location = useLocation();
  const navigate = useNavigate();
  const pageType = location.search.split('?')[1];
  const { isAuth } = useSelector(authSelector.all);

  /* =============================
  📦 Section - Methods:
  ============================= */
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='py-4 py-3 lg:py-10 xl:py-[120px]'>
      <div className='container mx-auto max-w-2xl p-3'>
        {/* Title */}
        <h1 className='flex items-center gap-2 justify-center font-medium text-xl text-center lg:text-2xl xl:text-4xl'>
          {pageType === 'login' ? <FaSignInAlt /> : <FaUserPlus />}
          {pageType[0].toUpperCase() + pageType.substring(1)}
        </h1>
        {/* Form */}
        {pageType === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
