/* =============================
📦 Custom Imports
============================= */

/* =============================
📦 Component - VerifyPage
============================= */
import { useEffect, useState } from 'react';
import { axiosInstance } from '@api/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHouseUser } from 'react-icons/fa';
import NotFoundPage from '@pages/NotFoundPage';
import { FaSignInAlt } from 'react-icons/all.js';

export default function VerifyPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const [validUrl, setValidUrl] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();
  /* =============================
  📦 Section - Methods:
  ============================= */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/users/verify/${token}`);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    })();
  }, [token]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-3 px-3 place-items-center min-h-full text-center pb-5'>
    <div className='grid gap-3 place-items-center'>
      {validUrl
        ? <>
          <h1 className='font-bold text-6xl md:text-4xl'>Email verified successfully</h1>
          <Link className='btn btn-primary max-w-max' to='/sign'>
            <FaSignInAlt />
            Login
          </Link>
        </>
        : <NotFoundPage />
      }
    </div>
  </div>;
}
