import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';
import toast from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { FormGroup } from '../components/ui/index.js';
import { defaultValues, validateSchema } from '../utils/validateSchema.js';
import { API } from '../api/api.js';

/* =============================
📦 Component - CreateProfilePage
============================= */
export default function CreateProfilePage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleSocial, setToggleSocial] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.createProfile)),
    defaultValues: defaultValues.createProfile,
  });

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API.profile.create(data));
    navigate(-1);
    toast.success('🎊 Your profile has been created!');
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
        Create Your Profile
      </h1>
      <p>👋 Let's get some information to make your profile stand out</p>
      {/* Form */}
      <form className='form flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
        {/* Status */}
        <FormGroup
          type='select'
          name='status'
          label='Status'
          options={['Developer', 'Junior Developer', 'Senior Developer', 'Manager', 'Student or Learning', 'Instructor', 'Intern', 'Other']}
          register={register} errors={errors}
        />
        {/* Company */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='text'
            name='company'
            label='Company'
            placeholder='Company'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>Could be your own company or one you work for</p>
        </div>
        {/* Website */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='text'
            name='website'
            label='Website'
            placeholder='Website'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>Could be your own or a company website</p>
        </div>
        {/* Location */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='text'
            name='location'
            label='Location'
            placeholder='Location'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>City & state suggested (eg. Boston, MA)</p>
        </div>
        {/* Skills */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='text'
            name='skills'
            label='Skills'
            placeholder='HTML,CSS,JavaScript,PHP'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</p>
        </div>
        {/* Github */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='text'
            name='github'
            label='Github'
            placeholder='Github Username'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>If you want your latest repos and a Github link, include your username</p>
        </div>
        {/* Bio */}
        <div className='grid gap-0.5 w-full'>
          <FormGroup
            type='textarea'
            name='bio'
            label='Bio'
            placeholder='A short bio of yourself'
            register={register}
            errors={errors}
          />
          <p className='text-sm'>Tell us a little about yourself</p>
        </div>
        {/* Social Links */}
        <div className='grid gap-0.5 w-full'>
          <button type='button' className='button button-default' onClick={() => setToggleSocial(p => !p)}>
            Add Social Network Links (Optional)
          </button>
          {toggleSocial &&
            <div className='grid gap-0.5 w-full'>
              <FormGroup
                type='text'
                name='twitter'
                label='Twitter'
                placeholder='Twitter URL'
                register={register}
              />
              <FormGroup
                type='text'
                name='facebook'
                label='Facebook'
                placeholder='Facebook URL'
                register={register}
              />
              <FormGroup
                type='text'
                name='youtube'
                label='Youtube'
                placeholder='Youtube URL'
                register={register}
              />
              <FormGroup
                type='text'
                name='youtube'
                label='Youtube'
                placeholder='Youtube URL'
                register={register}
              />
              <FormGroup
                type='text'
                name='linkedin'
                label='Linkedin'
                placeholder='Linkedin URL'
                register={register}
              />
              <FormGroup
                type='text'
                name='instagram'
                label='Instagram'
                placeholder='Instagram URL'
                register={register}
              />
            </div>
          }
        </div>
        {/* Buttons */}
        <div className='flex gap-3'>
          <button disabled={!isValid} type='submit' className='button button-secondary'>Submit</button>
          <button type='button' className='button button-primary' onClick={onBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}
