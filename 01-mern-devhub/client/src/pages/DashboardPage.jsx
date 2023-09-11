import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEditAlt, FaUserGraduate, FaUserMinus, MdOutlineGrade } from 'react-icons/all.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { API } from '../api/api.js';
import { profileSelector, resetProfileState } from '../features/profile/profileSlice.js';
import { Spinner } from '../components/ui/index.js';
import { logout } from '../features/auth/authSlice.js';
import getDate from '../utils/convertDate.js';

/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entry, status } = useSelector(profileSelector.all);

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    dispatch(API.profile.me())
      .then(() => dispatch(resetProfileState()));
  }, [dispatch]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      dispatch(API.profile.deleteAccount());
      dispatch(logout());
      dispatch(resetProfileState());
      toast.success('Your account has been deleted.');
      navigate('/auth?login');
    }
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (status === 'loading') return <Spinner />;

  return (
    <div className='container px-3 py-14 mx-auto flex flex-col items-start gap-4'>
      {/* Title */}
      <h1 className='font-bold text-lg xl:text-3xl'>Dashboard</h1>
      {/* */}
      {entry
        ? <>
          <p className='font-medium'>👋 Welcome {entry.user.name}!</p>

          {/* Dashboard Actions Buttons */}
          <div className='flex flex-wrap gap-3'>
            <Link className='button button-default border w-full sm:w-auto' to='/edit-profile'>
              <BiEditAlt />
              Edit Profile
            </Link>
            <Link className='button button-default border w-full sm:w-auto' to='/add-experience'>
              <MdOutlineGrade />
              Add Experience
            </Link>
            <Link className='button button-default border w-full sm:w-auto' to='/add-education'>
              <FaUserGraduate />
              Add Education
            </Link>
          </div>
          {/* Experience */}
          <h2 className='font-medium text-lg xl:text-2xl'>Experience Credentials</h2>
          {entry.experience.length !== 0
            ? <div className='overflow-x-auto'>
              <table className='w-full max-w-4xl'>
                <thead>
                <tr>
                  {['Company', 'Title', 'Years', ''].map((value) =>
                    <th key={value} className='px-4 py-2 border font-medium bg-white text-center'>{value}</th>,
                  )}
                </tr>
                </thead>
                <tbody>
                {entry.experience.map(exp =>
                  <tr key={exp._id}>
                    {/* Company */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {exp.company}
                    </td>
                    {/* Title */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {exp.title}
                    </td>
                    {/* Dates */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {exp.current ? `${getDate(exp.from)} - Now` : `${getDate(exp.from)} - ${getDate(exp.to)}`}
                    </td>
                    {/* Button Delete */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      <button className='button text-white bg-red-500 hover:bg-red-400'
                              onClick={() => dispatch(API.profile.deleteExperience(exp._id))}>
                        Delete
                      </button>
                    </td>
                  </tr>,
                )}
                </tbody>
              </table>
            </div>
            : <p>No Experience Entries</p>
          }
          {/* Education */}
          <h2 className='font-medium text-lg xl:text-2xl'>Education Credentials</h2>
          {entry.education.length !== 0
            ? <div className='overflow-x-auto'>
              <table className='w-full max-w-4xl'>
                <thead>
                <tr>
                  {['School', 'Degree', 'Years', ''].map((value) =>
                    <th key={value} className='px-4 py-2 border font-medium bg-white text-center'>{value}</th>,
                  )}
                </tr>
                </thead>
                <tbody>
                {entry.education.map(edu =>
                  <tr key={edu._id}>
                    {/* School */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {edu.school}
                    </td>
                    {/* Degree */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {edu.degree}
                    </td>
                    {/* Dates */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      {edu.current ? `${getDate(edu.from)} - Now` : `${getDate(edu.from)} - ${getDate(edu.to)}`}
                    </td>
                    {/* Button Delete */}
                    <td className='px-4 py-2 border font-medium bg-white'>
                      <button className='button text-white bg-red-500 hover:bg-red-400'
                              onClick={() => dispatch(API.profile.deleteEducation(edu._id))}>
                        Delete
                      </button>
                    </td>
                  </tr>,
                )}
                </tbody>
              </table>
            </div>
            : <p>No Education Entries</p>
          }
          {/* Delete account */}
          <button className='button text-white bg-red-500 hover:bg-red-400' onClick={onDeleteAccount}>
            <FaUserMinus />
            Delete My Account
          </button>
        </>
        : <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link className='button button-secondary' to='/create-profile'>Create Profile</Link>
        </>
      }
    </div>
  );
}
