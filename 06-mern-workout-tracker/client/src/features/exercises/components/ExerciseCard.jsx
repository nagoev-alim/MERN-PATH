import { useDispatch } from 'react-redux';
import { AiOutlineOrderedList, BiCommentDetail, BiTime, CgGym, FiTrash2, MdOutlineEditNote } from 'react-icons/all.js';
import moment from 'moment';
import toast from 'react-hot-toast';
/* =============================
📦 Custom Imports
============================= */
import { resetExercisesState, setEdit } from '@features/exercises/exercisesSlice.js';
import { API_EXERCISES } from '@api/api.js';
/* =============================
📦 Component - ExerciseCard
============================= */
export default function ExerciseCard({ item }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const duration = moment.duration(item.duration, 'minutes');
  /* =============================
  📦 Section - Methods:
  ============================= */
  // Delete item
  const onDelete = () => {
    dispatch(API_EXERCISES.DELETE(item._id))
      .then(() => {
        dispatch(resetExercisesState());
        toast.success(`${item.name} successfully deleted`);
      });
  };
  // Edit item
  const onEdit = () => {
    dispatch(setEdit({ isEdit: true, entry: item }));
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='w-full card gap-1'>
    <div className='flex justify-between gap-2'>
      <h3 className='inline-flex items-center flex-wrap gap-2 font-bold'><CgGym size={25} />{item.name}</h3>
      <div className='flex items-center gap-2'>
        {/* Edit item */}
        <button className='btn w-[40px] h-[40px] p-1' onClick={onEdit}>
          <MdOutlineEditNote size={26} />
        </button>
        {/* Delete item */}
        <button className='btn w-[40px] h-[40px] p-1 text-red-500' onClick={onDelete}>
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
    <p className='flex flex-wrap gap-1'>
      <span className='font-bold text-base flex items-center gap-1'>
        <BiTime size={20} />
        Duration:
      </span>
      {' '}{`${duration.hours()}:${duration.minutes() < 10 ? '0' : ''}${duration.minutes()}`}
    </p>
    <p className='flex flex-wrap gap-1'>
      <span className='font-bold text-base flex items-center gap-1'>
        <BiCommentDetail size={20} />
        Comment:
      </span>
      {' '}{item.comment.length === 0 ? '-' : item.comment}
    </p>
    <p className='font-bold text-base flex gap-1'>
      <AiOutlineOrderedList size={20} />
      Sets:
    </p>
    <table className='table-auto w-full'>
      <thead>
      <tr>
        <th className='font-medium p-1.5 border-2 border-neutral-800 bg-neutral-800 text-white'>Number</th>
        <th className='font-medium p-1.5 border-2 border-neutral-800 bg-neutral-800 text-white'>Kg</th>
        <th className='font-medium p-1.5 border-2 border-neutral-800 bg-neutral-800 text-white'>Reps</th>
      </tr>
      </thead>
      <tbody>
      {item.sets.map((set, setIdx) =>
        <tr key={setIdx}>
          <td className='p-1.5 border-2 border-neutral-800'>{setIdx + 1 < 10 ? `0${setIdx + 1}` : setIdx + 1}</td>
          <td className='p-1.5 border-2 border-neutral-800'>{set.kg ? `${set.kg} kg` : '-'}</td>
          <td className='p-1.5 border-2 border-neutral-800'>{set.reps} reps</td>
        </tr>,
      )}
      </tbody>
    </table>
  </div>;
}
