import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { BiSave, BsCheckLg, FiTrash2, TbEdit } from 'react-icons/all.js';
import moment from 'moment/moment.js';
/* =============================
📦 Custom Imports
============================= */
import { resetTodoState } from '@features/todo/todoSlice.js';
import { API_TODO } from '@api/api.js';
/* =============================
📦 Component - UrlCard
============================= */
export default function TodoCard({ item }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [checked, setChecked] = useState(item.completed);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onEdit = () => {
    setEdit(true);
    setEditTitle(item.title);
  };

  const onSaveEdit = () => {
    setEdit(false);
    dispatch(API_TODO.UPDATE({ id: item._id, data: { title: editTitle } }));
    setEditTitle('');
  };

  const onChange = ({ target: { checked: completed } }) => {
    setChecked(completed);
    dispatch(API_TODO.UPDATE({ id: item._id, data: { completed: completed } }));
  };

  const onDelete = () => {
    dispatch(API_TODO.DELETE(item._id))
      .then(() => {
        dispatch(resetTodoState());
        toast.success('Todo successfully deleted');
      });
  };

  const onSetTitle = ({ target: { value } }) => {
    setEditTitle(value);
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2'>
    <div className='flex items-center gap-2 border-neutral-300 border-2 p-2 rounded-sm'>
      {/* Checkbox */}
      <input type='checkbox' className='hidden' id={item._id} checked={item.completed} onChange={onChange} />
      <span className='checkbox'>
        {checked && <BsCheckLg size={25} />}
      </span>
      {/* If state Edit - Show Input or Label */}
      {edit
        ? <input className='input flex-grow py-1' type='text' name='title' value={edit ? editTitle : item.title}
                 onChange={onSetTitle} />
        : <label htmlFor={item._id} className='flex-grow break-all cursor-pointer'>
          {item.title}
        </label>
      }
    </div>
    {/* Buttons */}
    <div className='flex items-center gap-2'>
      <div className='mr-auto'>
        <p>{moment(item.createdAt).fromNow()}</p>
      </div>
      <button className='btn w-[40px] h-[40px] p-1' onClick={() => edit ? onSaveEdit() : onEdit()}>
        {edit ? <BiSave size={18} /> : <TbEdit size={18} />}
      </button>
      <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={onDelete}>
        <FiTrash2 size={18} />
      </button>
    </div>
  </div>;
}
