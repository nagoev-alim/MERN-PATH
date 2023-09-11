import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { profileSelector, resetProfileState } from '../features/profile/profileSlice.js';
import { API } from '../api/api.js';
import getDate from '../utils/convertDate.js';

/* =============================
📦 Component - ProfilePage
============================= */
export default function ProfilePage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { entry, repos, error, message } = useSelector(profileSelector.all);

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetProfileState());
    }
    Promise.all([
      dispatch(API.profile.getByUserId(id)),
      dispatch(API.profile.getRepos(state.data)),
    ]).then(() => dispatch(resetProfileState()));
  }, [dispatch]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    entry && <div className='container px-3 py-14 max-w-4xl mx-auto flex flex-col items-start gap-4'>
      {/* Go Back */}
      <button className='button button-secondary' onClick={() => navigate(-1)}>
        Go Back
      </button>
      {/* Top */}
      <div className='grid place-items-center gap-2 text-white p-4 border bg-slate-600 rounded-md w-full'>
        <img className='rounded-full' src={entry.user.avatarUrl} alt={entry.user.name} />
        <h1 className='font-bold text-lg md:text-3xl'>{entry.user.name}</h1>
        <p className='text-lg'>{entry.status}</p>
        <p>{entry.location}</p>
        {Object.keys(entry.social).length !== 0 && <ul className='flex flex-wrap gap-1'>
          {Object.entries(entry.social).map(([key, value]) =>
            <li key={key}>
              <a target='_blank' href={value}>{key}</a>
            </li>,
          )}
        </ul>}
      </div>
      {/* Bio */}
      <div className='grid gap-4 bg-white border shadow rounded-md w-full text-center p-4'>
        <div className='grid gap-2'>
          <h2 className='font-medium text-xl'>{entry.user.name}'s Bio</h2>
          <p>{entry.bio}</p>
        </div>
        <div className='grid gap-2'>
          <h2 className='font-medium text-xl'>Skill Set</h2>
          <ul className='flex flex-wrap gap-1 items-center justify-center'>
            {entry.skills.map((skill, index) =>
              <li className='flex items-center gap-0.5' key={index}><BsCheckLg size={20} />{skill}</li>,
            )}
          </ul>
        </div>
      </div>
      {/* Experience */}
      <div className='grid md:grid-cols-2 w-full gap-3'>
        {entry.experience.length !== 0 &&
          <div className='grid p-5 bg-white border shadow rounded-md'>
            <h2 className='font-medium text-lg'>Experience</h2>
            <ul className='grid gap-4'>
              {entry.experience.map(exp =>
                <li key={exp._id}>
                  <h3 className=''>{exp.company}</h3>
                  <p>{exp.current ? `${getDate(exp.from)} - Now` : `${getDate(exp.from)} - ${getDate(exp.to)}`}</p>
                  <p><span className='font-bold'>Position:</span> {exp.title}</p>
                  <p><span className='font-bold'>Description:</span> {exp.description}</p>
                </li>,
              )}
            </ul>
          </div>}
        {/* Education */}
        {entry.education.length !== 0 &&
          <div className='grid p-5 bg-white border shadow rounded-md'>
            <h2 className='font-medium text-xl'>Education</h2>
            <ul className='grid gap-4'>
              {entry.education.map(edu =>
                <li key={edu._id}>
                  <h3 className=''>{edu.school}</h3>
                  <p>{edu.current ? `${getDate(edu.from)} - Now` : `${getDate(edu.from)} - ${getDate(edu.to)}`}</p>
                  <p><span className='font-bold'>Degree:</span> {edu.degree}</p>
                  <p><span className='font-bold'>Field Of Study:</span> {edu.fieldofstudy}</p>
                  <p><span className='font-bold'>Description:</span> {edu.description}</p>
                </li>,
              )}
            </ul>
          </div>}
      </div>
      {/* Repos */}
      <div className='grid gap-3.5 w-full'>
        <h2 className='font-medium text-xl'>Github Repos</h2>
        <ul className='grid gap-3'>{repos.map(repo =>
          <li key={repo.id} className='bg-white p-3 gap-2 grid'>
            <a className='link font-medium text-emerald-400' target='_blank' href={repo.html_url}
               rel='noopener noreferrer'>
              {repo.name}
            </a>
            <p>{repo.description}</p>
            <ul className='flex flex-wrap gap-1'>
              <li className='rounded border p-1.5 text-sm bg-emerald-400 text-white'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='rounded border p-1.5 text-sm text-white bg-neutral-900'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='rounded border p-1.5 text-sm bg-gray-200'>Forks: {repo.forks_count}</li>
            </ul>
          </li>,
        )}</ul>
      </div>
    </div>
  );
}
