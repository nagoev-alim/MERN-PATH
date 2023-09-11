import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { resetUserState } from '@features/user/userSlice.js';
import { API_USER } from '@api/api.js';
/* =============================
📦 Component - LoginForm
============================= */
export default function LoginForm() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.login)),
    defaultValues: defaultValues.login,
  });

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API_USER.LOGIN(data))
      .then(() => {
        dispatch(resetUserState());
        navigate('/dashboard');
        reset();
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='font-bold text-xl lg:text-2xl text-center'>Sign In</h1>
      <FormGroup
        type='email'
        name='email'
        placeholder='Email'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <FormGroup
        type='password'
        name='password'
        placeholder='Password'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Submit</button>
      {/* Errors */}
      {Object.keys(errors).length !== 0 && <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
        <ErrorMessage errors={errors} field={'email'} />
        <ErrorMessage errors={errors} field={'password'} />
      </div>}
      {/* Links */}
      <p className='text-center'>
        Dont have an account? {' '}
        <Link className='font-bold' to='/sign?register'>
          Create a new account
        </Link>
      </p>
    </form>
  );
}
