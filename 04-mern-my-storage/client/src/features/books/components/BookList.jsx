import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
/* =============================
📦 Custom Imports
============================= */
import { API_BOOKS, API_MOVIES } from '@api/api.js';
import { booksSelector, resetBooksState } from '@features/books/booksSlice.js';
import { Link } from 'react-router-dom';
import { categorySelector } from '@features/category/categorySlice.js';
import moment from 'moment/moment.js';
import { FiTrash2, TbEdit } from 'react-icons/all.js';
import { resetMoviesState } from '@features/movies/moviesSlice.js';
/* =============================
📦 Component - BookList
============================= */
export default function BookList() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries: books, error, message } = useSelector(booksSelector);
  const category = useSelector(categorySelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetBooksState());
    }
    dispatch(API_BOOKS.GET())
      .then(() => {
        dispatch(resetBooksState());
      });
  }, [dispatch, error, message]);

  const onDelete = (id) => {
    dispatch(API_BOOKS.DELETE(id))
      .then(() => {
        dispatch(resetMoviesState());
        toast.success('Book successfully deleted');
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return books.length !== 0
    ? <div className='grid gap-2'>
      <h2 className='font-bold text-xl'>Books List</h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {books.map(entry =>
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
          >
            <div className='grid gap-3'>
              <h3>
                <Link
                  className='font-bold grid gap-2 border-amber-300 border-2 p-4 rounded-sm bg-amber-50 cursor-pointer transition-all hover:scale-[1.01]'
                  to={`/detail/${entry._id}`}
                  state={{ category}}
                >
                  {entry.name}
                </Link>
              </h3>
              <div className='flex items-center gap-2'>
                <div className='mr-auto'>
                  <p>{moment(entry.createdAt).fromNow()}</p>
                </div>
                <Link className='btn w-[40px] h-[40px] p-1' to={`/edit/${entry._id}`} state={{ category }}>
                  <TbEdit size={18} />
                </Link>
                <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={() => onDelete(entry._id)}>
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>,
        )}
      </div>
    </div>
    : <div className='grid gap-1'>
      <img className='max-w-[300px] mx-auto w-full' src='/assets/images/create-image.webp' alt='Create' />
      <p className='font-medium text-center'>You have not create any books.</p>
    </div>;
}
