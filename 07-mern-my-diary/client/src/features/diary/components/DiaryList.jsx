// 🔳 Imports:
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MdOutlinePermMedia } from 'react-icons/md';

// 🔳 Custom Imports:
import { diarySelector, resetDiaryState } from '@features/diary/diarySlice.js';
import { API_DIARY } from '@api/diary.js';
import { DiaryItem } from '@features/diary/components/index.js';
import moment from 'moment/moment.js';

// 🟥 Component: DiaryList

const DiaryList = ({search}) => {
  // 🟨 Variables & Hooks:
  const dispatch = useDispatch();
  const { entries, error, message } = useSelector(diarySelector);

  // 🟦 Side Effects:
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(API_DIARY.READ_ALL())
      .then(() => dispatch(resetDiaryState()));
  }, [dispatch, error, message]);

  // 🟪 Rendering:
  return entries.length !== 0
    ? (
      <div className='grid gap-2'>
        <h2 className='flex flex-wrap items-center gap-1 font-bold text-xl'>
          <MdOutlinePermMedia size={30} />Diary List
        </h2>
        <div className='grid gap-3 sm:grid-cols-2'>
          {entries.filter(e => moment(e.date).format('dddd, MMMM YYYY').toLowerCase().includes(search.toLowerCase())).map(entry =>
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <DiaryItem item={entry}  />
            </motion.div>,
          )}
        </div>
      </div>
    )
    : (
      <div className='grid gap-1'>
        <img className='max-w-[300px] mx-auto w-full' src='/assets/images/category-image.webp' alt='Create' />
        <p className='font-medium text-center'>You have not create any diary records.</p>
      </div>
    );
};

export default DiaryList;
