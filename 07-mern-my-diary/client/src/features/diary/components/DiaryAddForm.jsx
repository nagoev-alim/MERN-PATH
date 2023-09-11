// 🔳 Imports:
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// 🔳 Custom Imports:
import { API_DIARY } from '@api/diary.js';
import { diarySchema } from '@/utils/validateSchema.js';
import { resetDiaryState } from '@features/diary/diarySlice.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui';
import convertBase64 from '@/utils/convertBase64.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


// 🟥 Mock
const mock = {
  weather: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'],
  social: ['friends', 'family', 's/o', 'acquaintance', 'none'],
  school: ['class', 'study', 'homework', 'exam', 'group project'],
  romance: ['date', 'anniversary', 'gift', 'conflict', 'sex'],
  other: ['alcohol', 'smoking', 'coffee', 'snack', 'beverage'],
  meals: ['breakfast', 'lunch', 'dinner', 'night snack'],
  health: ['sick', 'hospitalization', 'clinic', 'medicine'],
  chores: ['cleaning', 'cooking', 'laundry', 'dishes'],
  beauty: ['haircut', 'manicure', 'skin care', 'makeup'],
  work: ['end on time', 'overtime', 'staff time', 'business trip'],
  emotions: ['excited', 'relaxed', 'proud', 'hopeful', 'happy', 'enthusiastic', 'butterflies', 'refreshed', 'gloomy', 'lonely', 'anxious', 'sad', 'angry', 'burdensome', 'annoyed', 'tired'],
  hobbies: ['exercise', 'movie & TV', 'gaming', 'reading', 'instrumental playing', 'taking a walk', 'listening to music', 'painting'],
  events: ['cinema', 'theme park', 'shopping', 'picnic', 'stay home', 'party', 'restaurant', 'travel'],
};

// 🟥 Component: DiaryAddForm
const DiaryAddForm = () => {
  // 🟨 Variables & Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(diarySchema.schema)),
    defaultValues: diarySchema.defaultValue,
  });

  // 🟩 Methods:
  const onSubmit = async (formData) => {
    let poster = null
    if (formData.poster[0]) {
      poster = await convertBase64(formData.poster[0]);
    }
    dispatch(API_DIARY.CREATE({ ...formData, poster }))
      .then(() => {
        dispatch(resetDiaryState());
        reset();
        navigate(-1);
        toast.success('Diary created successfully!');
      });
  };

  // 🟪 Rendering:
  return <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <button type='button' className='btn btn-primary max-w-max' onClick={() => navigate(-1)}>Go Back</button>
    <h3 className='font-medium text-xl'>👋 Hi, start fill your day</h3>
    <label className='form-group' >
      <input type='date' name='date' min={new Date().toISOString().split('T')[0]}  className='input'{...register('date', {})} />
    </label>
    {/* Days */}
    <div className='grid gap-1'>
      <p className='form-label flex gap-0.5'>How was your day?<sup className='flex text-red-500 text-lg h-1'>*</sup></p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {Array.from({ length: 5 }, (_, i) =>
          <label className='form-group group cursor-pointer' key={i + 1}>
            <input type='radio' name='day' value={`day-${i + 1}`} className='hidden peer' {...register('day', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/days-ico/day-${i + 1}.png`} alt={`day-${i + 1}`} />
          </label>,
        )}
      </div>
    </div>
    {/* Weather */}
    <div className='grid gap-1'>
      <p className='form-label'>Weather</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {mock.weather.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center' key={i + 1}>
            <input type='checkbox' name='weather' value={name} className='hidden peer'{...register('weather', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/weather-ico/weather-${i + 1}.jpg`} alt={`weather-${i + 1}`} />
            <span className='form-label'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Social */}
    <div className='grid gap-1'>
      <p className='form-label'>Social</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {mock.social.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='social' value={name} className='hidden peer' {...register('social', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/social-ico/social-${i + 1}.jpg`} alt={`social-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* School */}
    <div className='grid gap-1'>
      <p className='form-label'>School</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {mock.school.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='school' value={name} className='hidden peer' {...register('school', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/school-ico/school-${i + 1}.jpg`} alt={`school-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Romance */}
    <div className='grid gap-1'>
      <p className='form-label'>Romance</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {mock.romance.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='romance' value={name} className='hidden peer' {...register('romance', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/romance-ico/romance-${i + 1}.jpg`} alt={`romance-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Other */}
    <div className='grid gap-1'>
      <p className='form-label'>Other</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-5'>
        {mock.other.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='other' value={name} className='hidden peer' {...register('other', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/other-ico/other-${i + 1}.jpg`} alt={`other-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Meals */}
    <div className='grid gap-1'>
      <p className='form-label'>Meals</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-4'>
        {mock.meals.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='meals' value={name} className='hidden peer' {...register('meals', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/meals-ico/meals-${i + 1}.jpg`} alt={`meals-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Health */}
    <div className='grid gap-1'>
      <p className='form-label'>Health</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-4'>
        {mock.health.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='health' value={name} className='hidden peer' {...register('health', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/health-ico/health-${i + 1}.jpg`} alt={`health-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Chores */}
    <div className='grid gap-1'>
      <p className='form-label'>Chores</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-4'>
        {mock.chores.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='chores' value={name} className='hidden peer' {...register('chores', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/chores-ico/chores-${i + 1}.jpg`} alt={`chores-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Beauty */}
    <div className='grid gap-1'>
      <p className='form-label'>Beauty</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-4'>
        {mock.beauty.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='beauty' value={name} className='hidden peer' {...register('beauty', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/beauty-ico/beauty-${i + 1}.jpg`} alt={`beauty-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Work */}
    <div className='grid gap-1'>
      <p className='form-label'>Work</p>
      <div className='grid grid-cols-2 gap-1 place-items-center xs:grid-cols-4'>
        {mock.work.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='work' value={name} className='hidden peer' {...register('work', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/work-ico/work-${i + 1}.jpg`} alt={`work-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Emotions */}
    <div className='grid gap-1'>
      <p className='form-label'>Emotions</p>
      <div className='grid grid-cols-2 gap-1 gap-y-3 place-items-center xs:grid-cols-4'>
        {mock.emotions.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='emotions' value={name} className='hidden peer' {...register('emotions', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/emotions-ico/emotions-${i + 1}.jpg`} alt={`emotions-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Hobbies */}
    <div className='grid gap-1'>
      <p className='form-label'>Hobbies</p>
      <div className='grid grid-cols-2 gap-1 gap-y-3 place-items-center xs:grid-cols-4'>
        {mock.hobbies.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='hobbies' value={name} className='hidden peer' {...register('hobbies', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/hobbies-ico/hobbies-${i + 1}.jpg`} alt={`hobbies-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    {/* Events */}
    <div className='grid gap-1'>
      <p className='form-label'>Events</p>
      <div className='grid grid-cols-2 gap-1 gap-y-3 place-items-center xs:grid-cols-4'>
        {mock.events.map((name, i) =>
          <label className='form-group group cursor-pointer grid place-items-center items-baseline' key={i + 1}>
            <input type='checkbox' name='events' value={name} className='hidden peer' {...register('events', {})} />
            <img
              className='w-full max-w-[80px] h-fit max-h-[80px] grayscale rounded-full overflow-hidden group-hover:grayscale-0 peer-checked:grayscale-0'
              src={`/assets/images/events-ico/events-${i + 1}.jpg`} alt={`events-${i + 1}`} />
            <span className='form-label break-all'>{name}</span>
          </label>,
        )}
      </div>
    </div>
    <FormGroup type='time' name='sleep' label='Sleep' placeholder='Record Your Sleep' register={register} />
    <FormGroup type='textarea' name='note' label={`Today's note`} placeholder='Add note' register={register}
               errors={errors} dirtyFields={dirtyFields} />
    <label className='form-group'>
      <span className='form-label'>Today's photo</span>
      <input multiple={false} type='file' name='poster' className='hidden' {...register('poster')} />
      <img src='/assets/images/cover.webp' alt='photo' />
    </label>
    <button disabled={!isValid} className='btn btn-primary'>Done</button>
    {Object.keys(errors).length !== 0 && (
      <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
        {['date', 'day', 'note'].map((field, idx) => <ErrorMessage key={idx} errors={errors} field={field} />)}
      </div>
    )}
  </form>;
};

export default DiaryAddForm;
