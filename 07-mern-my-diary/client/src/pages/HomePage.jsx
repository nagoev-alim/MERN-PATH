// 🔳 Imports:
import { Link } from 'react-router-dom';
import { FaBook, FaSignInAlt } from 'react-icons/fa';
import { useEffect } from 'react';

// 🟥 Component: HomePage
const HomePage = () => {
  // 🟪 Rendering:
  return (
    <div className='container max-w-6xl mx-auto grid gap-3 px-3 pb-5'>
      <h1 className='font-bold text-xl md:text-3xl flex gap-1 items-center'>
        <FaBook /> My Diary
      </h1>
      <p>
        My Diary is a journaling app built on the MERN stack (MongoDB, Express, React, and Node.js) that allows users to
        easily create, edit, and view their entries, as well as organize them by categories and tags.
      </p>
      <img className='max-w-lg mx-auto w-full' src='/assets/images/home-image.webp' alt='SimpleDo' />
      <Link className='btn max-w-[170px] mx-auto' to='/sign'>
        <FaSignInAlt />
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;

