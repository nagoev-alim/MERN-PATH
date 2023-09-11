import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/all.js';
/* =============================
📦 Custom Imports
============================= */
import { UrlForm, UrlList } from '@features/url/components/index.js';
import { resetUrlState, urlSelector } from '@features/url/urlSlice.js';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '@api/api.js';
import { userSelector } from '@features/user/userSlice.js';

/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const dispatch = useDispatch();
  const { entries, error, message } = useSelector(urlSelector);
  const { user } = useSelector(userSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetUrlState());
    }
    dispatch(API_URL.GET_ALL())
      .then(() => {
        dispatch(resetUrlState());
      });
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <>
    {/* Section 01 */}
    <div className='grid gap-3 px-3 place-items-center text-center'>
      <h1 className='font-bold text-xl md:text-3xl'>
        👋 {user.name} Dashboard
      </h1>
    </div>
    {/* Section 02 - Form */}
    <UrlForm />
    {/* Section 03 - List */}
    <div className='grid gap-2 px-3 container mx-auto max-w-6xl'>
      <UrlList items={entries} />
    </div>
  </>;
}
