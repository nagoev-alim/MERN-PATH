// 🔳 Imports:
import { Link } from 'react-router-dom';
import { CgFileDocument } from 'react-icons/cg';
import moment from 'moment/moment.js';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/all.js';
import { useState } from 'react';

// 🔳 Custom Imports:

// 🟥 Component: DiaryItem
const DiaryItem = ({ item }) => {
  const [toggle, setToggle] = useState(true);
  const onToggle = () => {
    setToggle(p => !p);
  };
  // 🟪 Rendering:
  return (
    <div className='grid gap-1.5'>
      <div className={`card transition-all ${toggle ? 'max-h-[80px] overflow-hidden' : 'max-h-full overflow-auto'}`}>
        <Link className='grid gap-2' to={`/detail/${item._id}`}>
          <h3 className='inline-flex items-center flex-wrap gap-2 mb-2'>
            <img className='w-10' src={`/assets/images/days-ico/${item.day}.png`}
                 alt={item.day} /> {moment(item.date).format('dddd, MMMM YYYY')}
          </h3>
          {/* Sleep */}
          {item.sleep && <p className='text-base text-neutral-600'>Sleep: {item.sleep}</p>}
          {/* Social */}
          {item.social[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Social:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.social.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/social-ico/${name === 's/o' ? 'so' : name}.jpg`}
                       alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* School */}
          {item.school[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>School:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.school.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/school-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Romance */}
          {item.romance[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Romance:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.romance.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/romance-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Other */}
          {item.other[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Other:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.other.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/other-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Meals */}
          {item.meals[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Meals:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.meals.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/meals-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Health */}
          {item.health[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Health:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.health.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/health-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Chores */}
          {item.chores[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Chores:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.chores.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/chores-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Beauty */}
          {item.beauty[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Beauty:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.beauty.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/beauty-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Work */}
          {item.work[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Work:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.work.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/work-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Emotions */}
          {item.emotions[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Work:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.emotions.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/emotions-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Hobbies */}
          {item.hobbies[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Hobbies:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.hobbies.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/hobbies-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
          {/* Events */}
          {item.events[0].length !== 0 && (
            <>
              <p className='text-base text-neutral-600'>Hobbies:</p>
              <div className='flex flex-wrap gap-2.5'>
                {item.events.map((name, i) => <div key={i} className='grid gap-1 place-items-center'>
                  <img className='w-10' src={`/assets/images/events-ico/${name}.jpg`} alt={name} />
                  <p className='text-sm'>{name}</p>
                </div>)}
              </div>
            </>
          )}
        </Link>
      </div>
      <div className='flex items-center justify-between'>
        <p>{moment(item.createdAt).fromNow()}</p>
        <button onClick={onToggle}>
          {toggle ? <BsArrowsAngleExpand size={20} /> : <BsArrowsAngleContract size={20} />}
        </button>
      </div>
    </div>
  );
};

export default DiaryItem;
