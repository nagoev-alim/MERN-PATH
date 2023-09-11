import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BiCategory } from 'react-icons/all.js';
/* =============================
📦 Custom Imports
============================= */
import { BookmarkCard } from '@features/bookmarks/components/index.js';
/* =============================
📦 Component - BookmarkDetail
============================= */
export default function BookmarkDetail({items, categories}) {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return items.length !== 0
    ? <div className='grid gap-2'>
      <h2 className='flex flex-wrap items-center gap-1 font-bold text-xl'>
        <BiCategory size={30}/>
        Bookmarks
      </h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {items.map(entry =>
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
          >
            <BookmarkCard item={entry} categories={categories}/>
          </motion.div>,
        )}
      </div>
    </div>
    : <div className='grid gap-1'>
      <img className='max-w-[300px] mx-auto w-full' src='/assets/images/category-image.webp' alt='Create' />
      <p className='font-medium text-center'>You have not create any bookmarks.</p>
    </div>;
}
