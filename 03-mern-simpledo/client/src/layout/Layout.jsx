import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaHouseUser, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCog } from 'react-icons/all.js';
import { useDispatch, useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { logout, userSelector } from '@features/user/userSlice.js';
/* =============================
📦 Component - Layout
============================= */
export default function Layout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const date = new Date().getFullYear();
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='layout'>
    {/* Header */}
    <header className='header'>
      <Link className='logo' to='/'>
        <FaCheck size={20} /> SimpleDo
      </Link>
      <nav className='flex justify-center flex-wrap gap-2'>
        {user
          ? <>
            <Link className='btn' to='/account'>
              <FaUserCog />
              Account
            </Link>
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
