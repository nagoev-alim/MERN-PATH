import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
/* =============================
📦 Custom Imports
============================= */
import { CategoryCard } from '@features/categories/components/index.js';
import { API_CATEGORIES } from '@api/api.js';
import { categoriesSelector, resetCategoriesState } from '@features/categories/categoriesSlice.js';
import { BiCategory } from 'react-icons/all.js';
/* =============================
📦 Component - CategoryList
============================= */
export default function CategoryList() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries, error, message } = useSelector(categoriesSelector);
  /* =============================
  📦 Section - Methods:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetCategoriesState());
    }
    dispatch(API_CATEGORIES.GET())
      .then(() => {
        dispatch(resetCategoriesState());
      });
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return entries.length !== 0 && (
    <div className='grid gap-2'>
      <h2 className='flex flex-wrap items-center gap-1 font-bold text-xl'>
        <BiCategory size={30}/>
        Categories
      </h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {entries.map(entry =>
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
          >
            <CategoryCard item={entry} />
          </motion.div>,
        )}
      </div>
    </div>
  );
}
