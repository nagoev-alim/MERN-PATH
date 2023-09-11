import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RiImageAddFill } from 'react-icons/all.js';
import { useState } from 'react';
/* =============================
📦 Custom Imports
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { API_BOOKS } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import convertBase64 from '@/utils/convertBase64.js';
import { resetBooksState } from '@features/books/booksSlice.js';
/* =============================
📦 Component - UrlForm
============================= */
export default function BookForm({ home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [toggleForm, setToggleForm] = useState(true);
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.book)),
    defaultValues: defaultValues.book,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (data) => {
    const poster = await convertBase64(data.poster[0]);
    const quotes = data.quotes.split(',');
    dispatch(API_BOOKS.CREATE({ ...data, poster, quotes }))
      .then(() => {
        dispatch(resetBooksState());
        reset();
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='grid gap-2'>
      <button className='btn' onClick={() => setToggleForm(p => !p)}>Toggle Form</button>
      {!toggleForm && <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='text'
          name='name'
          label='Name'
          placeholder='Enter Book Name'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <FormGroup
          type='text'
          name='author'
          label='Author'
          placeholder='Enter Book Author'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <FormGroup
          type='text'
          name='publisher'
          label='Publisher'
          placeholder='Enter Book Publisher'
          register={register}
        />
        <FormGroup
          type='text'
          name='series'
          label='Series'
          placeholder='Enter Book Series'
          register={register}
        />
        <FormGroup
          type='number'
          name='yearPublication'
          label='Year Of Publication'
          placeholder='Enter Book Publication Year'
          register={register}
        />
        <FormGroup
          type='date'
          name='dateReading'
          label='Date Of Reading'
          register={register}
        />
        <label className='form-group'>
          <span className='form-label'>Select Status</span>
          <select className='input' name='status'{...register('status')}>
            <option>Select status</option>
            {['No started', 'Completed', 'In Progress'].map(option =>
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.substring(1)}
              </option>,
            )}
          </select>
        </label>
        <FormGroup
          type='text'
          name='isbn'
          label='ISBN'
          placeholder='Enter Book ISBN'
          register={register}
        />
        <FormGroup
          type='number'
          name='numberPages'
          label='Number Of Pages'
          placeholder='Enter Number Of Pages'
          register={register}
        />
        <FormGroup
          type='text'
          name='source'
          label='Source'
          placeholder='Enter Book Source'
          register={register}
        />
        <FormGroup
          type='textarea'
          label='Description'
          name='description'
          placeholder='Enter Book Description'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <FormGroup
          type='textarea'
          label='Quotes'
          name='quotes'
          placeholder='Enter Book Quotes'
          register={register}
        />
        <label className='form-group'>
          <span className='form-label'>Book Poster</span>
          <input multiple={false} type='file' name='poster' className='hidden' {...register('poster')} />
          <RiImageAddFill size={70} />
        </label>
        <button disabled={!isValid} className='btn btn-primary'>Add Book</button>
        {Object.keys(errors).length !== 0 && (
          <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
            <ErrorMessage errors={errors} field={'name'} />
            <ErrorMessage errors={errors} field={'author'} />
            <ErrorMessage errors={errors} field={'description'} />
          </div>
        )}
      </form>}
    </div>
  );
}
