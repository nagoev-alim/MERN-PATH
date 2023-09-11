import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearch } from 'react-icons/all.js';
/* =============================
📦 Custom Imports
============================= */
import { userSelector } from '@features/user/userSlice.js';
import { Modal } from '@ui/index.js';
import { API_CATEGORIES } from '@api/api.js';
import { categoriesSelector, resetCategoriesState } from '@features/categories/categoriesSlice.js';
import { CategoryList } from '@features/categories/components/index.js';
import { BookmarkList } from '@features/bookmarks/components/index.js';
/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const [toggleModal, setToggleModal] = useState(false);
  const [type, setType] = useState(null);
  const [search, setSearch] = useState('');
  const { entries: categories, error, message } = useSelector(categoriesSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetCategoriesState());
    }
    dispatch(API_CATEGORIES.GET())
      .then(() => dispatch(resetCategoriesState()));
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Methods:
  ============================= */
  // Create a new category/bookmark
  const onCreateCategory = (type) => {
    setType(type);
    setToggleModal(true);
  };
  // Search for bookmarks
  const onSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.username}, Dashboard</h1>
    {/* Buttons */}
    <div className='grid gap-3 sm:grid-cols-2'>
      <button className='btn btn-primary' onClick={() => onCreateCategory('category')}>
        Add Category
      </button>
      <button className='btn' onClick={() => onCreateCategory('bookmark')}>
        Add Bookmark
      </button>
    </div>
    {/* Search */}
    <label className='form-group'>
      <span className='form-label flex flex-wrap items-center gap-1 font-bold text-xl'>
        <IoSearch size={25} /> Search
      </span>
      <input className='input font-medium' value={search} onChange={onSearch} type='text'
             placeholder='Search bookmark' />
    </label>
    {/* Modal */}
    <Modal type={type} categories={categories} toggleModal={toggleModal}
           toggleModalWindow={(reset) => {
             setToggleModal(p => !p);
             reset();
           }}
    />
    {/* Lists */}
    <CategoryList />
    <BookmarkList categories={categories} search={search} setSearch={setSearch} />
  </div>;
}
