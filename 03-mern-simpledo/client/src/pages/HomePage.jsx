import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
/* =============================
📦 Component - HomePage
============================= */
export default function HomePage() {
  return <div className='container max-w-6xl mx-auto grid gap-3 px-3 pb-5'>
    <h1 className='font-bold text-xl md:text-3xl flex gap-1 items-center'>About SimpleDo</h1>
    <p>
      ✏️The SimpleDo application is designed to organize tasks and to-do lists. It allows creating, editing, and
      deleting tasks, as well as organizing them into lists or categories.
    </p>
    <p>
      ✏️The SimpleDo can be useful for those who want to organize their tasks and improve their productivity.
    </p>
    <img className='max-w-lg mx-auto w-full' src='/assets/images/home-image.webp' alt='SimpleDo' />
    <Link className='btn max-w-[170px] mx-auto' to='/sign'>
      <FaSignInAlt />
      Get Started
    </Link>
  </div>;
}
