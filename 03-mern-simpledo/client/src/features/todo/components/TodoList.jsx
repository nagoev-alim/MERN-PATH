import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
/* =============================
📦 Custom Imports
============================= */
import { TodoCard } from '@features/todo/components/index.js';
import { resetTodoState, todoSelector } from '@features/todo/todoSlice.js';
import { API_TODO } from '@api/api.js';
/* =============================
📦 Component - UrlList
============================= */
export default function TodoList() {
  const dispatch = useDispatch();
  const { currentFilter, entries, error, message } = useSelector(todoSelector);

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetTodoState());
    }
    dispatch(API_TODO.GET())
      .then(() => {
        dispatch(resetTodoState());
      });
  }, [dispatch, error, message]);

  const filtered = entries.filter((todo) => {
    switch (currentFilter) {
      case 'completed' :
        return todo.completed;
      case 'incompleted' :
        return !todo.completed;
      case 'important' :
        return todo.important;
      default :
        return todo;
    }
  });

  return entries.length !== 0
    ? <AnimatePresence>
      <div className='grid gap-3'>
        {filtered.map(entry =>
          <motion.div
            key={entry._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
          >
            <TodoCard key={entry._id} item={entry} />
          </motion.div>,
        )}
      </div>
    </AnimatePresence>
    : <div className='grid gap-1'>
      <img className='max-w-[300px] mx-auto w-full' src='/assets/images/create-image.webp' alt='Create' />
      <p className='font-medium text-center'>You have not create any todos.</p>
    </div>;
}
