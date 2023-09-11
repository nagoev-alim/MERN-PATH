// 🔳 Imports:
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment.js';
import { AiOutlineEdit, CgTrash } from 'react-icons/all.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// 🔳 Custom Imports:
import { API_DIARY } from '@api/diary.js';
import { diarySelector, resetDiaryState } from '@features/diary/diarySlice.js';
import { Spinner } from '@ui';

// 🟥 Component: DetailPage
const DetailPage = () => {
  // 🟨 Variables & Hooks:
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { entry, error, message } = useSelector(diarySelector);
  let content = null;

  // 🟦 Side Effects:
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(API_DIARY.READ_SINGLE(id))
      .then(() => resetDiaryState());
  }, [dispatch, navigate, id]);

  // 🟩 Methods:
  const onDelete = () => {
    dispatch(API_DIARY.DELETE(id))
      .then(() => {
        resetDiaryState();
        navigate('/dashboard');
        toast.success('Entry deleted successfully');
      });
  };

  // 🟪 Rendering:
  if (!entry) {
    content = <Spinner />;
  } else {
    content = (
      <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
        <div className='flex gap-2 justify-between'>
          <button className='btn btn-primary max-w-max' onClick={() => navigate(-1)}>Go Back</button>
          <div className='flex gap-2'>
            <Link to={`/edit/${id}`} className='btn text-green-500 px-3 py-2'><AiOutlineEdit size={25} /></Link>
            <button className='btn text-red-500 px-3 py-2' onClick={onDelete}><CgTrash size={25} /></button>
          </div>
        </div>
        {/* Day */}
        <h1 className='flex flex-wrap gap-2 items-center font-bold text-lg lg:text-2xl'>
          <img className='w-10 sm:w-[80px]' src={`/assets/images/days-ico/${entry.day}.png`} alt={entry.day} />
          {moment(entry.date).format('dddd, MMMM YYYY')}
        </h1>
        {/* Social */}
        {entry.social[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Social:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.social.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/social-ico/${name === 's/o' ? 'so' : name}.jpg`}
                     alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* School */}
        {entry.school[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>School:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.school.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/school-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Romance */}
        {entry.romance[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Romance:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.romance.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/romance-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Other */}
        {entry.other[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Other:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.other.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/other-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Meals */}
        {entry.meals[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Meals:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.meals.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/meals-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Health */}
        {entry.health[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Health:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.health.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/health-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Chores */}
        {entry.chores[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Chores:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.chores.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/chores-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Beauty */}
        {entry.beauty[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Beauty:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.beauty.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/beauty-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Work */}
        {entry.work[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Work:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.work.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/work-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Emotions */}
        {entry.emotions[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Work:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.emotions.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/emotions-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Hobbies */}
        {entry.hobbies[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Hobbies:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.hobbies.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/hobbies-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Events */}
        {entry.events[0].length !== 0 && (
          <>
            <p className='text-lg text-neutral-900'>Hobbies:</p>
            <div className='flex flex-wrap gap-2.5'>
              {entry.events.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                <img className='w-10 sm:w-[80px]' src={`/assets/images/events-ico/${name}.jpg`} alt={name} />
                <p className='text-base'>{name}</p>
              </div>)}
            </div>
          </>
        )}
        {/* Sleep */}
        {entry.sleep && <p className='text-lg text-neutral-900'>Sleep: {entry.sleep}</p>}
        {/* Note*/}
        <p className='text-lg text-neutral-900'>Note:</p>
        <p>{entry.note}</p>
        {/* Poster */}
        <p className='text-lg text-neutral-900'>Poster:</p>
        {entry.poster && <img src={entry.poster} alt='Poster' />}
      </div>
    );
  }
  return content;
};

export default DetailPage;
