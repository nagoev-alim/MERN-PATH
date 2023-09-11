// 🔳 Imports packages
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🔳 Custom Imports:
import { accountSchema } from '@/utils/validateSchema.js';
import { API_USER } from '@api/user.js';
import { ErrorMessage, Spinner } from '@ui';
import FormGroup from '@ui/form/FormGroup.jsx';
import { logout, resetUserState, userSelector } from '@features/user/userSlice.js';

// 🟥 Component: AccountPage
const AccountPage = () => {
  // 🟨 Variables & Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error, message } = useSelector(userSelector);
  const { register, handleSubmit, formState: { isValid, errors }, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(accountSchema.schema)),
    defaultValues: accountSchema.defaultValues,
  });

  // 🟦 Side Effects:
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    setValue('username', user.username);
    setValue('email', user.email);
  }, [user, error, message]);


  // 🟩 Methods:
  /**
   * @description - Form submit handler
   * @param data
   */
  const onSubmit = (data) => {
    dispatch(API_USER.UPDATE(data))
      .then(() => {
        if (status === 'loading') {
          return <Spinner />;
        } else {
          dispatch(resetUserState());
          toast.success('User profile successfully updated');
          navigate(-1);
        }
      });
  };

  /**
   * @description - Delete user profile
   */
  const onDelete = () => {
    dispatch(API_USER.DELETE())
      .then(() => {
        dispatch(logout());
        toast.success('User profile successfully deleted');
      });
  };

  // 🟪 Rendering:
  return (
    <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
      <h1 className='font-bold text-xl md:text-3xl text-center'>👋 Setting up your account</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup type='text' name='username' label='Username' placeholder='Username' register={register} />
        <FormGroup type='email' name='email' label='Email' placeholder='Email' register={register} />
        <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Update Profile</button>
        <button type='button' className='btn btn-primary bg-red-500 border-red-500 hover:scale-100' onClick={onDelete}>
          Delete Profile
        </button>
      </form>
      {/* Errors */}
      {Object.keys(errors).length !== 0 && (
        <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
          {['username', 'email'].map(field => <ErrorMessage errors={errors} field={field} />)}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
