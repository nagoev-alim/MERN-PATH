import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
/* =============================
📦 Component - HomePage
============================= */
export default function HomePage() {
  return <div className='container max-w-6xl mx-auto grid text-center place-content-center gap-3 px-3 pb-5'>
    <h1 className='font-bold text-xl md:text-3xl flex gap-1 items-center justify-center'>
      <CgGym size={35} /> Fitness Tracker
    </h1>
    <p>
      Get the most out of every workout with our comprehensive workout tracker. Whether you're lifting weights or doing
      cardio, our tracker helps you stay on track and reach your fitness goals.
    </p>
    <img className='max-w-lg mx-auto w-full' src='/assets/images/home-image.webp' alt='SimpleDo' />
    <Link className='btn max-w-[170px] mx-auto' to='/sign'>
      <FaSignInAlt />
      Get Started
    </Link>
  </div>;
}
