import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
/* =============================
📦 Custom Imports
============================= */
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { API_USER } from '@api/api.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { resetUserState, userSelector } from '@features/user/userSlice.js';
/* =============================
📦 Component - AccountPage
============================= */
export default function AccountPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { user, error, message } = useSelector(userSelector);
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, setValue, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.account)),
    defaultValues: defaultValues.account,
  });
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    setValue('name', user.name);
    setValue('email', user.email);
  }, [user, error, message]);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    if (data.name === user.name && data.email === user.email) {
      toast.error('Please enter a new values');
    }
    dispatch(API_USER.UPDATE(data))
      .then(() => {
        dispatch(resetUserState());
        toast.success('User profile successfully updated');
        reset();
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-2xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 Setting up your account</h1>
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        type='text'
        name='name'
        placeholder='Username'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <FormGroup
        type='email'
        name='email'
        placeholder='Email'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Update</button>
      {/* Errors */}
      {Object.keys(errors).length !== 0 && <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
        <ErrorMessage errors={errors} field={'name'} />
        <ErrorMessage errors={errors} field={'email'} />
      </div>}
    </form>
  </div>;
}
