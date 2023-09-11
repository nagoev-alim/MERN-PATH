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
📦 Component - AddExperiencePage
============================= */
export default function AddExperiencePage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToDate, setShowToDate] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, getValues, reset, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.addExperience)),
    defaultValues: defaultValues.addExperience,
  });

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    console.log(data);
    dispatch(API.profile.addExperience(data));
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
      <h1 className='font-bold text-lg xl:text-3xl'>
        Add An Experience
      </h1>
      <p>👋 Add any developer/programming positions that you have had in the past</p>
      {/* Form */}
      <form className='form flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='text'
          name='title'
          label='Job Title'
          placeholder='Job Title'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='text'
          name='company'
          label='Company'
          placeholder='Company'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='text'
          name='location'
          label='Location'
          placeholder='Location'
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
          <span className='form-group-label form-label'>Current Job</span>
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
          type='text'
          name='location'
          label='Location'
          placeholder='Location'
          register={register}
        />
        <FormGroup
          type='textarea'
          name='description'
          label='Job Description'
          placeholder='Job Description'
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
