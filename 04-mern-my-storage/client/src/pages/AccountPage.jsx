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
  const { register, handleSubmit, formState: { isValid }, setValue } = useForm({
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
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('username', user.username);
    setValue('email', user.email);
    setValue('phone', user.phone);
    user.dob && setValue('dob', new Date(user.dob).toISOString().substring(0, 10));
    setValue('city', user.address.city);
    setValue('country', user.address.country);
    setValue('zipCode', user.address.zipCode);
  }, [user, error, message]);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API_USER.UPDATE(data))
      .then(() => {
        dispatch(resetUserState());
        toast.success('User profile successfully updated');
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 Setting up your account</h1>
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup type='text' name='firstName' label='First Name' placeholder='First Name' register={register} />
      <FormGroup type='text' name='lastName' label='Last Name' placeholder='Last Name' register={register} />
      <FormGroup type='text' name='username' label='Username' placeholder='Username' register={register} />
      <FormGroup type='email' name='email' label='Email' placeholder='Email' register={register} />
      <FormGroup type='text' name='phone' label='Phone' placeholder='Phone' register={register} />
      <FormGroup type='date' name='dob' label='Date of Birthday' placeholder='Date of Birthday' register={register} />
      <FormGroup type='text' name='city' label='City' placeholder='City' register={register} />
      <FormGroup type='text' name='country' label='Country' placeholder='Country' register={register} />
      <FormGroup type='text' name='zipCode' label='Zip Code' placeholder='Zip Code' register={register} />
      <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Update</button>
    </form>
  </div>;
}
