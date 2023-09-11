import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
/* =============================
📦 Custom Imports
============================= */
import { notesSelector, resetNotesState } from '@features/notes/notesSlice.js';
import { API_NOTES } from '@api/api.js';
import { NoteCard } from '@features/notes/components/index.js';
/* =============================
📦 Component - NoteList
============================= */
export default function NoteList() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries: notes, error, message } = useSelector(notesSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetNotesState());
    }
    dispatch(API_NOTES.GET())
      .then(() => {
        dispatch(resetNotesState());
      });
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return notes.length !== 0
    ? <div className='grid gap-2'>
      <h2 className='font-bold text-xl'>Notes List</h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {notes.map(entry =>
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
          >
            <NoteCard item={entry} />
          </motion.div>,
        )}
      </div>
    </div>
    : <div className='grid gap-1'>
      <img className='max-w-[300px] mx-auto w-full' src='/assets/images/create-image.webp' alt='Create' />
      <p className='font-medium text-center'>You have not create any notes.</p>
    </div>;
}
