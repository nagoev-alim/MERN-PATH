// 🔳 Imports:
import { FaSignInAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// 🔳 Custom Imports:
import NotFoundPage from '@pages/NotFoundPage';
import toast from 'react-hot-toast';
import AXIOS from '@api/api.js';

// 🟥 Component: VerifyPage
const VerifyPage = () => {
  // 🟨 Variables & Hooks:
  const [validUrl, setValidUrl] = useState(true);
  const { token } = useParams();
  let content = null;

  // 🟦 Side Effects:
  useEffect(() => {
    (async () => {
      try {
        const { data } = await AXIOS.get(`/users/verify/${token}`);
        toast.error('Something went wrong, please try again');
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, please try again');
        setValidUrl(false);
      }
    })();
  }, [token]);

  // 🟪 Rendering:
  if (validUrl) {
    content = (
      <>
        <h1 className='font-bold text-6xl md:text-4xl'>Email verified successfully</h1>
        <Link className='btn btn-primary max-w-max' to='/sign'>
          <FaSignInAlt />
          Login
        </Link>
      </>
    );
  } else {
    content = <NotFoundPage />;
  }

  return (
    <div className='grid gap-3 px-3 place-items-center min-h-full text-center pb-5'>
      <div className='grid gap-3 place-items-center'>
        {content}
      </div>
    </div>
  );
};

export default VerifyPage;
