import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';
/* =============================
📦 Custom Imports
============================= */
import { FormGroup } from '../components/ui/index.js';
import { defaultValues, validateSchema } from '../utils/validateSchema.js';
import { API } from '../api/api.js';

/* =============================
📦 Component - AddEducationPage
============================= */
export default function AddEducationPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToDate, setShowToDate] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.addEducation)),
    defaultValues: defaultValues.addEducation,
  });

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API.profile.addEducation(data));
    navigate(-1);
  };

  const onBack = () => {
    navigate(-1);
    reset();
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='container px-3 py-14 max-w-4xl mx-auto flex flex-col items-start gap-4'>
      <h1 className='font-bold text-lg xl:text-3xl'>Add Your Education</h1>
      <p>👋 Add any school, bootcamp, etc that you have attended</p>
      {/* Form */}
      <form className='form flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='text'
          name='school'
          label='School or Bootcamp'
          placeholder='School or Bootcamp'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='text'
          name='degree'
          label='Degree or Certificate'
          placeholder='Degree or Certificate'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='text'
          name='fieldofstudy'
          label='Field Of Study'
          placeholder='Field Of Study'
          register={register}
        />
        <FormGroup
          type='date'
          name='from'
          label='Date From'
          register={register}
          errors={errors}
        />
        <label className='form-group max-w-max'>
          <span className='form-group-label form-label'> Current School or Bootcamp</span>
          <input
            type='checkbox'
            name='current'
            className='input w-[30px] h-[30px] checked:bg-emerald-400 cursor-pointer'
            {...register('current')}
            {...{
              checked: showToDate,
              onChange: ({ target: { checked } }) => setShowToDate(checked),
            }}
          />
        </label>
        {!showToDate && <FormGroup type='date' name='to' label='Date From' register={register} />}
        <FormGroup
          type='textarea'
          name='description'
          label='Program Description'
          placeholder='Program Description'
          register={register}
        />
        {/* Buttons */}
        <div className='flex gap-3'>
          <button disabled={!isValid} type='submit' className='button button-secondary'>Submit</button>
          <button type='button' className='button button-primary' onClick={onBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}
