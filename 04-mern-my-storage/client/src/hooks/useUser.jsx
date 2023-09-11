import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import { API_USER } from '@api/api.js';
import { resetUserState, userSelector } from '@features/user/userSlice.js';

export default function useUser() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { status, error, message } = useSelector(userSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetUserState());
    }

    if (localStorage.getItem('accessToken')) {
      const userId = jwt_decode(localStorage.getItem('accessToken')).userId;
      dispatch(API_USER.GET(userId))
        .then(() => {
          dispatch(resetUserState());
        });
    }
  }, [dispatch, error, message]);

  return [status];
}
