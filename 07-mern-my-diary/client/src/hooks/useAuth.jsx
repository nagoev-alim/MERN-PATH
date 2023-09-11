// 🔳 Imports:
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 🔳 Custom Imports:
import { API_USER } from '@api/user.js';
import { resetUserState, userSelector } from '@features/user/userSlice.js';
import Cookies from 'js-cookie';

// 🟥 Component: UseAuth

const UseAuth = () => {
  // 🟨 Variables & Hooks:
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(userSelector)
  const [isAuth, setIsAuth] = useState(false);
  // 🟦 Side Effects:
  useEffect(() => {
    if (Cookies.get('refreshToken') && Cookies.get('token')) {
      dispatch(API_USER.READ()).then(() => resetUserState());
      setIsAuth(true);
    }else {
      setIsAuth(false);
    }
  }, [dispatch]);

  return isLoggedIn;
};

export default UseAuth;
