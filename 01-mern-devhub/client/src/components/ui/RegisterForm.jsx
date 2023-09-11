import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { authSelector, resetAuthState } from '../../features/auth/authSlice.js';
import { defaultValues, validateSchema } from '../../utils/validateSchema.js';
import { API } from '../../api/api.js';
import { FormGroup } from './index.js';

/* =============================
📦 Component - RegisterForm
============================= */
export default function RegisterForm() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, message } = useSelector(authSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.register)),
    defaultValues: defaultValues.register,
  });

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetAuthState());
    }
    if (status === 'success') {
      dispatch(resetAuthState());
      navigate('/auth?login');
    }
  }, [status, error, message, dispatch]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API.auth.register(data));
    toast.success('👋 Registration successful');
    reset();
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='text'
          name='name'
          label='Name'
          placeholder='John Doe'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='email'
          name='email'
          label='Email'
          placeholder='example@email.com'
          register={register}
          errors={errors}
        />
        <FormGroup
          type='password'
          name='password'
          label='Password'
          placeholder='at least 8 characters'
          register={register}
          errors={errors}
        />
        <button disabled={!isValid} type='submit' className='button button-secondary'>
          Submit
        </button>
      </form>
      <p className='text-center mt-4'>
        Already have an account?
        <Link className='link font-medium' to='/auth?login'>Sign In</Link>
      </p>
    </>
  );
}
