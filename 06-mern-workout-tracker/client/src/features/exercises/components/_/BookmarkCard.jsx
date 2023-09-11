import { BiSave, CgFileDocument, FiTrash2, GoClippy, IoQrCodeSharp, TbEdit } from 'react-icons/all.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment/moment.js';
/* =============================
📦 Custom Imports
============================= */
import { API_BOOKMARKS } from '@api/api.js';
import { resetBookmarksState } from '@features/bookmarks/bookmarksSlice.js';
import capitalStr from '@/utils/capitalStr.js';
/* =============================
📦 Component - BookmarkCard
============================= */
export default function BookmarkCard({ item, categories }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ title: '', url: '', categoryId: '' });
  /* =============================
  📦 Section - Methods:
  ============================= */
  // Set edit and set data
  const onEdit = () => {
    setEdit(true);
    setData({ title: item.title, url: item.url, categoryId: item.categoryId });
  };
  // Inputs change handler
  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };
  // Save changes and update item
  const onSaveEdit = () => {
    setEdit(false);
    dispatch(API_BOOKMARKS.UPDATE({ id: item._id, data }))
      .then(() => {
        dispatch(resetBookmarksState());
        toast.success('Bookmark successfully updated.');
      });
    setData({ title: '', url: '', categoryId: '' });
  };
  // Delete item
  const onDelete = () => {
    dispatch(API_BOOKMARKS.DELETE(item._id))
      .then(() => {
        dispatch(resetBookmarksState());
        toast.success('Bookmark successfully deleted');
      });
  };
  // Copy to clipboard
  const onClipboard = () => {
    navigator.clipboard.writeText(item.url).then(
      () => toast.success('Copied to clipboard'),
      () => toast.error('Failed when copy to clipboard'),
    );
  };
  // Generate QR Code
  const onQrCode = async () => {
    const image = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x$200&data=${item.url}`);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'qr-code';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code generated');
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-3'>
    <div className='card'>
      {edit
        ? (
          <div className='grid gap-2'>
            <input className='input font-medium' value={data.title} onChange={onChange} type='text' name='title' />
            <input className='input font-medium' value={data.url} onChange={onChange} type='text' name='url' />
            {categories.length > 0 && (
              <label className='form-group'>
                <select className='input' name='categoryId' onChange={onChange} defaultValue={item.categoryId}>
                  <option value=''>Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{capitalStr(cat.title)}</option>)}
                </select>
              </label>
            )}
          </div>
        )
        : (
          <a href={item.url} target='_blank'>
            <h3 className='inline-flex items-center flex-wrap gap-2'><CgFileDocument size={25} />{item.title}</h3>
            {item.categoryId && (
              <p className='p-2 rounded-md bg-neutral-800 text-white max-w-max text-xs'>{item.category.title}</p>
            )}
          </a>
        )
      }
    </div>
    <div className='grid items-center gap-2 sm:flex'>
      <div className='mr-auto'>
        <p>{moment(item.createdAt).fromNow()}</p>
      </div>
      <div className='flex gap-2'>
        {/* Generate QR Code */}
        <button className='btn w-[40px] h-[40px] p-1' onClick={onQrCode}>
          <IoQrCodeSharp size={18} />
        </button>
        {/* Copy to Clipboard */}
        <button className='btn w-[40px] h-[40px] p-1' onClick={onClipboard}>
          <GoClippy size={18} />
        </button>
        {/* Edit/Save Item */}
        <button className='btn w-[40px] h-[40px] p-1' onClick={() => edit ? onSaveEdit() : onEdit()}>
          {edit ? <BiSave size={18} /> : <TbEdit size={18} />}
        </button>
        {/* Delete item */}
        <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={onDelete}>
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  </div>;
}
