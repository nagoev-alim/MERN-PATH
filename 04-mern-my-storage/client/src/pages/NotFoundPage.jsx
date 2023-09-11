import { FaHouseUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
/* =============================
📦 Component - NotFoundPage
============================= */
export default function NotFoundPage() {
  return <div className='grid gap-3 px-3 place-items-center min-h-full text-center pb-5'>
    <div className='grid gap-3 place-items-center'>
      <h1 className='font-bold text-6xl md:text-8xl'>404</h1>
      <p>This is not the page you're looking for.</p>
      <img className='max-w-md mx-auto w-full' src='/assets/images/404.webp' alt='404' />
      <Link className='btn btn-primary max-w-max' to='/'>
        <FaHouseUser />
        Return to Home
      </Link>
    </div>
  </div>
}
