// 🔳 Imports:
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { RiAdminLine } from 'react-icons/ri';

// 🔳 Custom Imports:
import { registerSchema } from '@/utils/validateSchema.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { resetUserState, userSelector } from '@features/user/userSlice.js';
import { API_USER } from '@api/user.js';

// 🟥 Component: RegisterForm
const RegisterForm = () => {
  // 🟨 Variables & Hooks:
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector(userSelector);
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(registerSchema.schema)),
    defaultValues: registerSchema.defaultValues,
  });

  // 🟦 Side Effects:
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
  }, [error, message]);


  // 🟩 Methods:
  /**
   * @description - Form Submit Handler
   * @param data
   */
  const onSubmit = (data) => {
    dispatch(API_USER.REGISTER(data))
      .then(() => {
        dispatch(resetUserState());
        toast.success('User registered successfully');
        reset();
      });
    navigate('/sign');
  };

  // 🟪 Rendering:
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='flex justify-center gap-1 items-center font-bold text-xl lg:text-2xl text-center'>
        <RiAdminLine /> Sign Up
      </h1>
      <FormGroup type='text' name='username' placeholder='Username' register={register} errors={errors}
                 dirtyFields={dirtyFields} />
      <FormGroup type='email' name='email' placeholder='Email' register={register} errors={errors}
                 dirtyFields={dirtyFields} />
      <FormGroup type='password' name='password' placeholder='Password' register={register} errors={errors}
                 dirtyFields={dirtyFields} />
      <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Submit</button>
      {/* Errors */}
      {Object.keys(errors).length !== 0 && (
        <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
          {['username', 'email', 'password'].map((field, idx) => <ErrorMessage key={idx} errors={errors} field={field} />)}
        </div>
      )}
      {/* Links */}
      <p className='text-center'>
        Already have account? {' '}
        <Link className='font-bold' to='/sign'>
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
