import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
/* =============================
📦 Custom Imports
============================= */
import { Spinner } from '@ui/index.js';
import { exercisesSelector, setEdit } from '@features/exercises/exercisesSlice.js';
import { ExerciseForm } from '@features/exercises/components/index.js';
/* =============================
📦 Component - Modal
============================= */
export default function Modal({ isOpen, toggleModal }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { edit, status } = useSelector(exercisesSelector);
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (edit.isEdit === true) {
      toggleModal();
    }
  }, [edit]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (status === 'loading') return <Spinner />;
  return <Transition.Root show={isOpen} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={() => {
        toggleModal();
        dispatch(setEdit({
          isEdit: false,
          entry: null,
        }));
      }}
    >
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity' />
      </Transition.Child>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <Transition.Child
            as={Fragment} enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Panel className='modal'>
              <ExerciseForm edit={edit}  toggleModal={toggleModal}/>
              <button type='button' className='btn' onClick={() => {
                toggleModal();
                dispatch(setEdit({
                  isEdit: false,
                  entry: null,
                }));
              }}>Close
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>;
}
