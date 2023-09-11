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
import { API_MOVIES } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import convertBase64 from '@/utils/convertBase64.js';
import { resetMoviesState } from '@features/movies/moviesSlice.js';
/* =============================
📦 Component - UrlForm
============================= */
export default function MovieForm({ home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [toggleForm, setToggleForm] = useState(true);
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.movie)),
    defaultValues: defaultValues.movie,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (data) => {
    const poster = await convertBase64(data.poster[0]);
    dispatch(API_MOVIES.CREATE({ ...data, poster }))
      .then(() => {
        dispatch(resetMoviesState());
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
          placeholder='Enter Movie Name'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <FormGroup
          type='number'
          name='yearProduction'
          label='Year Of Publication'
          placeholder='Enter Movie Publication Year'
          register={register}
        />
        <FormGroup
          type='text'
          name='country'
          label='Country'
          placeholder='Enter Country'
          register={register}
        />
        <FormGroup
          type='text'
          name='genre'
          label='Genre'
          placeholder='For example: thriller, drama'
          register={register}
        />
        <FormGroup
          type='text'
          name='slogan'
          label='Slogan'
          placeholder='Enter Movie Slogan'
          register={register}
        />
        <FormGroup
          type='text'
          name='directed'
          label='Directed'
          placeholder='Enter Movie Directed'
          register={register}
        />
        <FormGroup
          type='text'
          name='time'
          label='Time'
          placeholder='Enter Movie Time'
          register={register}
        />
        <FormGroup
          type='date'
          name='dateViewing'
          label='Date Of Viewing'
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
          type='textarea'
          name='review'
          label='Review'
          placeholder='Enter Your Review'
          register={register}
        />
        <label className='form-group'>
          <span className='form-label'>Movie Poster</span>
          <input multiple={false} type='file' name='poster' className='hidden' {...register('poster')} />
          <RiImageAddFill size={70} />
        </label>
        <button disabled={!isValid} className='btn btn-primary'>Add Movie</button>
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
