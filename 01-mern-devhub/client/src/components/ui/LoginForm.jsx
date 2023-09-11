import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

/* =============================
📦 Custom Imports
============================= */
import { authSelector, resetAuthState } from '../../features/auth/authSlice.js';
import { defaultValues, validateSchema } from '../../utils/validateSchema.js';
import { API } from '../../api/api.js';
import { FormGroup } from './index.js';

/* =============================
📦 Component - LoginForm
============================= */
export default function LoginForm() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, message } = useSelector(authSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.login)),
    defaultValues: defaultValues.login,
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
      navigate('/dashboard');
    }
  }, [status, error, message, dispatch]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API.auth.login(data));
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
        Don't have an account?
        <Link className='link font-medium' to='/auth?register'>Sign Up</Link>
      </p>
    </>
  );
}
