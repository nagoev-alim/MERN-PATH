import { useDispatch, useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { categorySelector, setCategory } from '@features/category/categorySlice.js';
/* =============================
📦 Component - CategorySelect
============================= */
export default function CategorySelect() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const category = useSelector(categorySelector);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <label className='form-group'>
    <span className='form-label'>Select Category</span>
    <select
      className='input'
      value={category}
      onChange={({ target: { value } }) => dispatch(setCategory(value))}
    >
      <option>Select category</option>
      {['notes', 'books', 'movies'].map(option =>
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.substring(1)}
          </option>,
        )}
    </select>
  </label>;
}
