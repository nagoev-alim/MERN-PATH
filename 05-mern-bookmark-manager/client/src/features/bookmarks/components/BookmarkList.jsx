import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BiCategory } from 'react-icons/all.js';
/* =============================
📦 Custom Imports
============================= */
import { API_BOOKMARKS } from '@api/api.js';
import { bookmarksSelector, resetBookmarksState } from '@features/bookmarks/bookmarksSlice.js';
import { BookmarkCard } from '@features/bookmarks/components/index.js';
/* =============================
📦 Component - BookmarkList
============================= */
export default function BookmarkList({ categories, search, setSearch }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries, error, message } = useSelector(bookmarksSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetBookmarksState());
    }
    dispatch(API_BOOKMARKS.GET()).then(() => dispatch(resetBookmarksState()));
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return entries.length !== 0
    ? (
      <div className='grid gap-2'>
        <h2 className='flex flex-wrap items-center gap-1 font-bold text-xl'><BiCategory size={30} />Bookmarks</h2>
        <div className='grid gap-3 sm:grid-cols-2'>
          {entries.filter(e => e.title.toLowerCase().includes(search.toLowerCase())).map(entry =>
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <BookmarkCard item={entry} categories={categories} />
            </motion.div>,
          )}
        </div>
      </div>
    )
    : (
      <div className='grid gap-1'>
        <img className='max-w-[300px] mx-auto w-full' src='/assets/images/category-image.webp' alt='Create' />
        <p className='font-medium text-center'>You have not create any bookmarks.</p>
      </div>
    );
}
