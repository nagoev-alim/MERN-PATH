import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiLogInCircle, FaSignInAlt } from 'react-icons/all.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

/* =============================
📦 Custom Imports
============================= */
import { authSelector } from '../features/auth/authSlice.js';

/* =============================
📦 Component - IndexPage
============================= */
export default function IndexPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const { isAuth } = useSelector(authSelector.all);
  const navigate = useNavigate();

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [navigate, isAuth]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='index-page'>
      <div className='grid gap-2 lg:gap-4 relative z-[1]'>
        {/* Title */}
        <h1 className='font-bold text-2xl lg:text-4xl xl:text-6xl'>
          Developer Hub
        </h1>
        {/* Paragraph */}
        <p className='text-lg'>
          Create a developer profile/portfolio, share posts and get help from other developers
        </p>
        {/* Links */}
        <div className='flex flex-wrap justify-center gap-2'>
          <Link className='button button-default' to='/auth?register'>
            <BiLogInCircle />
            Register
          </Link>
          <NavLink className='button button-primary' to='/auth?login'>
            <FaSignInAlt />
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}
