import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiCategory, BsFillJournalBookmarkFill } from 'react-icons/all.js';
import moment from 'moment/moment.js';
/* =============================
📦 Custom Imports
============================= */
import { exercisesSelector, resetExercisesState } from '@features/exercises/exercisesSlice.js';
import { API_EXERCISES } from '@api/api.js';
import { ExerciseCard } from '@features/exercises/components/index.js';
/* =============================
📦 Component - ExerciseList
============================= */
export default function ExerciseList() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries, error, message } = useSelector(exercisesSelector);
  /* =============================
  📦 Section - Methods:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetExercisesState());
    }
    dispatch(API_EXERCISES.GET()).then(() => dispatch(resetExercisesState()));
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return entries.length !== 0
    ? (
      <div className='grid gap-2'>
        <h2 className='flex flex-wrap items-center gap-1 font-bold text-xl'><BsFillJournalBookmarkFill size={30} />History</h2>
        <div className='grid gap-3'>
          {entries.map((entry) =>
            <div className='grid gap-2' key={entry._id}>
              <h3 className='font-bold text-lg'>Date: {' '}
                <span className='bg-amber-50 border-2 border-amber-300 p-1'>
                  {moment(entry._id).format('DD/MM/YYYY')}
                </span>
              </h3>
              <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3'>
                {entry.records.map(entry =>
                  <motion.div
                    key={entry._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                  >
                    <ExerciseCard item={entry} />
                  </motion.div>,
                )}
              </div>
            </div>,
          )}
        </div>
      </div>
    )
    : (
      <div className='grid gap-1'>
        <img className='max-w-[300px] mx-auto w-full' src='/assets/images/category-image.webp' alt='Create' />
        <p className='font-medium text-center'>You have not create any exercises.</p>
      </div>
    );
}
