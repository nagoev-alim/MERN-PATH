/* =============================
📦 Custom Imports
============================= */

/* =============================
📦 Component - Layout
============================= */
import { Link, useNavigate } from 'react-router-dom';
import { FaHouseUser, FaSignInAlt, FaSignOutAlt, FaUser, TbUnlink } from 'react-icons/all.js';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '@features/user/userSlice.js';
import { resetTemporaryState } from '@features/temporary/temporarySlice.js';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const date = new Date().getFullYear();
  /* =============================
  📦 Component - Layout
  ============================= */
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetTemporaryState());
    navigate('/');
  };
  /* =============================
  📦 Component - Layout
  ============================= */
  return <div className='layout'>
    {/* Header */}
    <header className='header'>
      <Link className='logo' to='/'>
        <TbUnlink size={22} /> Shorty
      </Link>
      <nav className='flex justify-center flex-wrap gap-2'>
        {user
          ? <>
            <Link className='btn' to='/dashboard'>
              <FaHouseUser />
              Dashboard
            </Link>
            <button className='btn btn-primary' onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </>
          : <>
            <Link className='btn' to='/sign'>
              <FaSignInAlt />
              Sign In
            </Link>
            <Link className='btn btn-primary' to='/sign?register'>
              <FaUser />
              Sign Up
            </Link>
          </>
        }
      </nav>
    </header>
    {/* Main */}
    <main className='py-10'>
      {children}
    </main>
    {/* Footer */}
    <footer className='footer'>
      <p>Copyright &copy; {date}</p>
      <p>
        Created by {' '}
        <a className='font-bold' target='_blank'
           href='https://github.com/nagoev-alim'>Nagoev Alim</a>
      </p>
    </footer>
  </div>;
}
