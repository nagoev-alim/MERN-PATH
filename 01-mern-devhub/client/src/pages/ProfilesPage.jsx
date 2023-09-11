import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* =============================
📦 Custom Imports
============================= */
import { profileSelector, resetProfileState } from '../features/profile/profileSlice.js';
import { API } from '../api/api.js';

/* =============================
📦 Component - ProfilesPage
============================= */
export default function ProfilesPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries: profiles, error, message } = useSelector(profileSelector.all);

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(API.profile.getAll()).then(() => dispatch(resetProfileState()));
  }, [dispatch, error, message]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='container px-3 py-14 max-w-4xl mx-auto flex flex-col items-start gap-4'>
      <h1 className='font-bold text-lg xl:text-3xl'>
        Developers
      </h1>
      <p>👋 Browse and connect with developers</p>

      {profiles.length !== 0
        ? <div className='grid gap-3 w-full md:grid-cols-2'>
          {profiles.map(profile =>
            <div className='w-full grid gap-2 p-3 place-items-center bg-white shadow rounded-md border'
                 key={profile._id}>
              <img className='border rounded-full' src={profile.user.avatarUrl} alt={profile.user.name} />
              <h3 className='font-medium text-lg'>{profile.user.name}</h3>
              <p>{profile.status}</p>
              <p>{profile.location}</p>
              <ul className='flex flex-wrap gap-1 items-center justify-center'>
                {profile.skills.map((skill, index) =>
                  <li className='flex items-center gap-0.5' key={index}><BsCheckLg size={20} />{skill}</li>
                )}
              </ul>
              <Link
                className='button button-secondary'
                to={`/profile/${profile.user._id}`}
                state={{ data: profile.github }}>
                View Profile
              </Link>
            </div>,
          )}
        </div>
        : <p>Profile list is empty</p>
      }
    </div>
  );
}
