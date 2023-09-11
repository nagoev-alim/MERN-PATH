import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { BiSave, FiTrash2, TbEdit } from 'react-icons/all.js';
import moment from 'moment/moment.js';
/* =============================
📦 Custom Imports
============================= */
import { API_NOTES } from '@api/api.js';
import { resetNotesState } from '@features/notes/notesSlice.js';
/* =============================
📦 Component - UrlCard
============================= */
export default function NoteCard({ item }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ title: '', body: '' });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onEdit = () => {
    setEdit(true);
    setData({
      title: item.title,
      body: item.body,
    });
  };

  const onSaveEdit = () => {
    setEdit(false);
    dispatch(API_NOTES.UPDATE({ id: item._id, data }));
    setData({ title: '', body: '' });
  };

  const onDelete = () => {
    dispatch(API_NOTES.DELETE(item._id))
      .then(() => {
        dispatch(resetNotesState());
        toast.success('Note successfully deleted');
      });
  };

  const onChange = ({ target: { name, value } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 '>
    <div className='grid gap-2 border-amber-300 border-2 p-4 rounded-sm bg-amber-50'>
      {edit
        ? <>
          <input className='input' value={data.title} onChange={onChange} type='text' name='title' />
          <textarea className='input min-h-[150px]' value={data.body} onChange={onChange} name='body' />
        </>
        : <>
          <h3 className='font-bold'>{item.title}</h3>
          <p>{item.body}</p>
        </>
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
