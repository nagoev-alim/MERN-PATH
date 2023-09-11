import { CgFolder, FaHouseUser, FiTrash2 } from 'react-icons/all.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
/* =============================
📦 Custom Imports
============================= */
import { API_BOOKMARKS, API_CATEGORIES } from '@api/api.js';
import { categoriesSelector, resetCategoriesState } from '@features/categories/categoriesSlice.js';
import { Spinner } from '@ui/index.js';
import BookmarkDetail from '../features/bookmarks/components/BookmarkDetail.jsx';
import { bookmarksSelector, resetBookmarksState } from '@features/bookmarks/bookmarksSlice.js';
/* =============================
📦 Component - CategoryPage
============================= */
export default function CategoryPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { entries: categories, entry, status, error, message } = useSelector(categoriesSelector);
  const { entries: bookmarks } = useSelector(bookmarksSelector);
  const items = bookmarks.filter(bookmark => bookmark.category?._id === id);
  let content = null;
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    Promise.all([
      dispatch(API_CATEGORIES.GET_SINGLE(id)),
      dispatch(API_BOOKMARKS.GET()),
    ]).then(() => {
      dispatch(resetBookmarksState());
      dispatch(resetCategoriesState());
    });
  }, [dispatch, error, message]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onDelete = (id) => {
    dispatch(API_CATEGORIES.DELETE(id))
      .then(() => {
        dispatch(resetBookmarksState());
        navigate(-1)
        toast.success('Category successfully deleted');
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (status === 'loading') {
    content = <Spinner />;
  } else {
    content = entry && <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
      <button className='btn max-w-max' onClick={() => navigate(-1)}>
        <FaHouseUser />
        Back
      </button>
      <div className='grid gap-3 sm:flex sm:justify-between sm:items-center'>
        <h1 className='flex flex-wrap gap-2 items-center font-bold text-xl md:text-3xl'>
          <CgFolder size={25} /> {entry.title}
        </h1>
        <div className='flex items-center gap-2'>
          <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={() => onDelete(entry._id)}>
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
      <BookmarkDetail items={items} categories={categories} />
    </div>;
  }
  return content;
}
