import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* =============================
📦 Custom Imports
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { API_NOTES } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { resetNotesState } from '@features/notes/notesSlice.js';
import { useState } from 'react';
/* =============================
📦 Component - UrlForm
============================= */
export default function NoteForm({ home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [toggleForm, setToggleForm] = useState(true);
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.note)),
    defaultValues: defaultValues.note,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API_NOTES.CREATE(data))
      .then(() => {
        dispatch(resetNotesState());
        reset();
        setToggleForm(true);
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
          name='title'
          label='Title'
          placeholder='Enter Note Title'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <FormGroup
          type='textarea'
          label='Description'
          name='body'
          placeholder='Enter Note Description'
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
        />
        <button disabled={!isValid} className='btn btn-primary'>Add Todo</button>
        {Object.keys(errors).length !== 0 && (
          <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
            <ErrorMessage errors={errors} field={'title'} />
            <ErrorMessage errors={errors} field={'body'} />
          </div>
        )}
      </form>}
    </div>
  );
}
