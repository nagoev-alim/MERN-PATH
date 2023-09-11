import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BiLogInCircle,
  CgProfile,
  FaCodeBranch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAstronaut,
  MdOutlinePostAdd,
} from 'react-icons/all.js';
import { useDispatch, useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { authSelector, logout } from '../../features/auth/authSlice.js';

/* =============================
📦 Component - Header
============================= */
export default function Header() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pageType = location.search.split('?')[1];
  const { isAuth } = useSelector(authSelector.all);

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
  return (
    <header className='header'>
      <div className='container mx-auto grid gap-2 place-items-center md:flex md:justify-between md:items-center  '>
        {/* Logo */}
        <Link className='font-bold flex gap-0.5' to='/'>
          Dev<FaCodeBranch size={20} />Hub
        </Link>
        {/* Menu */}
        <ul className='menu'>
          <li>
            <NavLink className='link-flex' to='/profiles'>
              <CgProfile />
              Developers
            </NavLink>
          </li>
          {/* Check if user is exists */}
          {!isAuth
            ? <>
              <li>
                <NavLink className={({ isActive }) => {
                  return pageType === 'register' && isActive ? 'link-flex active' : 'link-flex';
                }} to='/auth?register'>
                  <BiLogInCircle />
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return pageType === 'login' && isActive ? 'link-flex active' : 'link-flex';
                }} to='/auth?login'>
                  <FaSignInAlt />
                  Login
                </NavLink>
              </li>
            </>
            : <>
              <li>
                <NavLink className='link-flex' to='/posts'>
                  <MdOutlinePostAdd />
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink className='link-flex' to='/dashboard'>
                  <FaUserAstronaut />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button className='link-flex' onClick={onLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </>
          }
        </ul>
      </div>
    </header>
  );
}
