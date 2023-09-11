/* =============================
📦 Custom Imports
============================= */

/* =============================
📦 Component - UrlForm
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { API_TEMPORARY, API_URL } from '@api/api.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { resetTemporaryState } from '@features/temporary/temporarySlice.js';

export default function UrlForm({ home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.url)),
    defaultValues: defaultValues.url,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(
      home
        ? API_TEMPORARY.CREATE(data)
        : API_URL.CREATE(data),
    ).then(() => {
      dispatch(resetTemporaryState());
      reset();
    });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <form className='form py-5 px-3 container mx-auto max-w-6xl sm:gap-2 sm:grid-cols-[1fr_232px]'
          onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        type='text'
        name='originalUrl'
        placeholder='Enter your URL'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <button disabled={!isValid} className='btn btn-primary'>Shorten It</button>
      {Object.keys(errors).length !== 0 && (
        <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
          <ErrorMessage errors={errors} field={'originalUrl'} />
        </div>
      )}
    </form>
  );
}
