import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { BsJournalBookmarkFill } from 'react-icons/all.js';
/* =============================
📦 Component - HomePage
============================= */
export default function HomePage() {
  return <div className='container max-w-6xl mx-auto grid gap-3 px-3 pb-5'>
    <h1 className='font-bold text-xl md:text-3xl flex gap-1 items-center'>
      <BsJournalBookmarkFill/> Bookmarks Manager
    </h1>
    <p>
      Organise your existing bookmarks using Bookmark Manager. You can move your existing bookmarks to separate
      folders, by just specifying any word present in your bookmark URL.
    </p>
    <img className='max-w-lg mx-auto w-full' src='/assets/images/home-image.webp' alt='SimpleDo' />
    <Link className='btn max-w-[170px] mx-auto' to='/sign'>
      <FaSignInAlt />
      Get Started
    </Link>
  </div>;
}
