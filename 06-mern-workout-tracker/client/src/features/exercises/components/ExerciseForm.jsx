import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
/* =============================
📦 Custom Imports
============================= */
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { resetExercisesState, setEdit } from '@features/exercises/exercisesSlice.js';
import { API_EXERCISES } from '@api/api.js';
/* =============================
📦 Component - ExerciseForm
============================= */
export default function ExerciseForm({ edit, toggleModal }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, setValue, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.exercises)),
    defaultValues: defaultValues.exercises,
  });
  const [sets, setSets] = useState([{ kg: '', reps: '' }]);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (edit.isEdit) {
      edit.entry.date && setValue('date', new Date(edit.entry.date).toISOString().substring(0, 10));
      setValue('name', edit.entry.name);
      setValue('duration', edit.entry.duration);
      setValue('comment', edit.entry.comment);
      setSets(edit.entry.sets);
    }
  }, [dispatch, edit]);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (formData) => {
    if (edit.isEdit) {
      dispatch(API_EXERCISES.UPDATE({
        id: edit.entry._id,
        data: { ...formData, sets },
      })).then(() => dispatch(resetExercisesState()));
    } else {
      dispatch(API_EXERCISES.CREATE({ ...formData, sets })).then(() => {
        dispatch(resetExercisesState());
        dispatch(setEdit({ isEdit: false, entry: null }));
      });
    }
    reset();
    toggleModal();
  };

  const onChange = (name, value, index) => {
    const list = [...sets];
    if (edit.isEdit) {
      list[index] = { ...list[index], [name]: value };
    } else {
      list[index][name] = value;
    }
    setSets(list);
  };

  const onAddSet = () => {
    setSets([...sets, { kg: '', reps: '' }]);
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <h1 className='form-title'>
      {edit.isEdit ? 'Update' : 'Add'} {' '}Exercise
    </h1>
    <FormGroup
      type='date'
      name='date'
      label='Date'
      placeholder='Date'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    <FormGroup
      type='text'
      name='name'
      label='Exercise Name'
      placeholder='Exercise Name'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    <FormGroup
      type='number'
      name='duration'
      label='Exercise Duration'
      placeholder='Exercise Duration'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    <FormGroup
      type='textarea'
      name='comment'
      label='Exercise Comment'
      placeholder='Exercise Comment'
      register={register}
    />
    <div className='grid gap-3'>
      <span className='form-label'>Sets</span>
      <div className='grid gap-2 max-h-[100px] overflow-auto'>
        {sets.map((set, idx) =>
          <div className='grid grid-cols-[50px_auto_auto] gap-3 items-center w-full' key={idx}>
            <p className='btn'>{idx + 1}</p>
            <input type='number' className='input w-full' name='kg' value={set.kg ?? ''} placeholder='Kg'
                   onChange={({ target: { name, value } }) => onChange(name, value, idx)} />
            <input type='number' className='input w-full' name='reps' value={set.reps} placeholder='Reps'
                   onChange={({ target: { name, value } }) => onChange(name, value, idx)} />
          </div>,
        )}
      </div>
      <button type='button' className='btn' onClick={onAddSet}>Add Set</button>
    </div>
    <button disabled={!isValid} className='btn btn-primary hover:scale-100'>{edit.isEdit ? 'Update' : 'Create'}</button>
    {Object.keys(errors).length !== 0 && (
      <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
        <ErrorMessage errors={errors} field={'name'} />
        <ErrorMessage errors={errors} field={'date'} />
        <ErrorMessage errors={errors} field={'duration'} />
      </div>
    )}
  </form>;
}
