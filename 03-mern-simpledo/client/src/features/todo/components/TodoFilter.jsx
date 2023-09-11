import { useDispatch, useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { setCurrentFilter, todoSelector } from '@features/todo/todoSlice.js';
/* =============================
📦 Component - TodoFilter
============================= */
export default function TodoFilter() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch()
  const {currentFilter} = useSelector(todoSelector)
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 sm:grid-cols-3'>
    {['all', 'completed', 'incompleted'].map(item =>
      <button
        key={item}
        className={`btn ${currentFilter === item ? 'btn-primary' : ''}`}
        onClick={() => dispatch(setCurrentFilter(item))}
      >
        {item.charAt(0).toUpperCase() + item.substring(1)}
      </button>,
    )}
  </div>
}
