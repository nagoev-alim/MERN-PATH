// 🔳 Imports:
import { Link, useNavigate } from 'react-router-dom';
import { FaHouseUser, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCog, FaBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
// 🔳 Custom Imports:
import { logout, userSelector } from '@features/user/userSlice.js';
import { API_USER } from '@api/user.js';

/**
 * @description - List of menu items
 * @type {object}
 */
const mock = {
  authorization: [
    {
      type: 'Link',
      className: 'btn rounded-md',
      to: '/account',
      icon: <FaUserCog />,
    },
    {
      type: 'Link',
      className: 'btn rounded-md',
      to: '/dashboard',
      icon: <FaHouseUser />,
    },
    {
      type: 'button',
      className: 'btn btn-primary rounded-md',
      icon: <FaSignOutAlt />,
    },
  ],
  unauthorization: [
    {
      type: 'Link',
      className: 'btn rounded-md',
      to: '/sign',
      icon: <FaSignInAlt />,
    },
    {
      type: 'Link',
      className: 'btn btn-primary rounded-md',
      to: '/sign?register',
      icon: <FaUser />,
    },
  ],
};

// 🟥 Component: Layout
const Layout = ({ children }) => {
  // 🟨 Variables & Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const date = new Date().getFullYear();
  let content = null;

  // 🟩 Methods:
  const onLogout = () => {
    dispatch(API_USER.LOGOUT()).then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  // 🟪 Rendering:
  if (user) {
    content = <>
      {mock.authorization.map((link, idx) => {
        switch (link.type) {
          case 'Link':
            return <Link key={idx} to={link.to} className={link.className}>{link.icon}</Link>;
          case 'button':
            return <button key={idx} onClick={onLogout} className={link.className}>{link.icon}</button>;
          default:
            return null;
        }
      })}
    </>;
  } else {
    content = <>
      {mock.unauthorization.map((link, idx) => {
        switch (link.type) {
          case 'Link':
            return <Link key={idx} to={link.to} className={link.className}>{link.icon}</Link>;
          default:
            return null;
        }
      })}
    </>;
  }
  return (
    <div className='layout'>

      {/* Header */}
      <header className='header'>
        <Link className='logo' to='/'>
          <FaBook size={20} /> My Diary
        </Link>
        <nav className='flex justify-center flex-wrap gap-2'>{content}</nav>
      </header>

      {/* Main */}
      <main className='py-10'>{children}</main>

      {/* Footer */}
      <footer className='footer'>
        <p>Copyright &copy; {date}</p>
        <p>
          Created by {' '}
          <a className='font-bold' target='_blank'
             href='https://github.com/nagoev-alim'>Nagoev Alim</a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;

