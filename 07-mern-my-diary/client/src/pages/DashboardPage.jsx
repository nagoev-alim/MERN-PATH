// 🔳 Imports:
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// 🔳 Custom Imports:
import { userSelector } from '@features/user/userSlice.js';
import { DiaryList } from '@features/diary/components/index.js';

// 🟥 Component: DashboardPage
const DashboardPage = () => {
  // 🟨 Variables & Hooks:
  const { user } = useSelector(userSelector);
  const [search, setSearch] = useState('');

  // 🟩 Methods:
  /**
   * @description - Search for bookmarks
   * @param value
   */
  const onSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  // 🟪 Rendering:
  return (
    <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
      <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.username}, Dashboard</h1>
      <Link className='btn' to='/add'>Add Diary</Link>
      <label className='form-group'>
        <span className='form-label flex flex-wrap items-center gap-1 font-bold text-xl'>
          <IoSearch size={25} /> Search
        </span>
        <input className='input font-medium' placeholder='Search records' type='text' value={search} onChange={onSearch} />
      </label>
      <DiaryList search={search} setSearch={setSearch} />
    </div>
  );
};

export default DashboardPage;
