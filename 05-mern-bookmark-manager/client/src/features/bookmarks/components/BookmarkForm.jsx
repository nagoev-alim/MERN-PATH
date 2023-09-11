import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* =============================
📦 Custom Imports
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { API_BOOKMARKS } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { resetBookmarksState } from '@features/bookmarks/bookmarksSlice.js';
import capitalStr from '@/utils/capitalStr.js';
/* =============================
📦 Component - BookmarkForm
============================= */
export default function BookmarkForm({ categories, toggleModalWindow }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.bookmark)),
    defaultValues: defaultValues.bookmark,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (data) => {
    dispatch(API_BOOKMARKS.CREATE(data))
      .then(() => {
        dispatch(resetBookmarksState());
        toggleModalWindow(reset);
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <h1 className='form-title'>Add Bookmark</h1>
    <FormGroup
      type='text'
      name='title'
      placeholder='Title'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    <FormGroup
      type='text'
      name='url'
      placeholder='URL'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    {categories.length > 0 && (
      <label className='form-group'>
        <select className='input' name='status'{...register('categoryId')}>
          <option value=''>Select Category</option>
          {categories.map(cat =>
            <option key={cat._id} value={cat._id}>{capitalStr(cat.title)}</option>,
          )}
        </select>
      </label>
    )}
    <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Create</button>
    {Object.keys(errors).length !== 0 && (
      <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
        <ErrorMessage errors={errors} field={'title'} />
        <ErrorMessage errors={errors} field={'url'} />
      </div>
    )}
  </form>;
}
