import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
/* =============================
📦 Component - HomePage
============================= */
export default function HomePage() {
  return <div className='container max-w-6xl mx-auto grid gap-3 px-3 pb-5'>
    <h1 className='font-bold text-xl md:text-3xl flex gap-1 items-center'>
      About MyStorageNotes
    </h1>
    <p>
      ✏️ The MyStorageNotes is a place to store your notes. The user-friendly interface and minimalist design make it
      easy to create and save information that's important to you.
    </p>
    <p>
      ✏️ Free your head for useful thoughts, keep the rest in the MyStorageNotes
    </p>
    <img className='max-w-lg mx-auto w-full' src='/assets/images/home-image.webp' alt='SimpleDo' />
    <Link className='btn max-w-[170px] mx-auto' to='/sign'>
      <FaSignInAlt />
      Get Started
    </Link>
  </div>;
}
