// 🔳 Imports:
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

// 🔳 Custom Imports:
import { Spinner } from '@ui/index.js';
// import { bookmarksSelector } from '@features/bookmarks/bookmarksSlice.js';
import { useForm } from 'react-hook-form';
import { modalSelector, toggleModal } from '@features/modal/modalSlice.js';
// import { BookmarkForm } from '@features/bookmarks/components/index.js';

// 🟥 Component: Modal
const Modal = () => {
  // 🟨 Variables & Hooks:
  const dispatch = useDispatch();
  // const { status } = useSelector(bookmarksSelector);
  const { isOpen } = useSelector(modalSelector);
  const { reset } = useForm();
  let content = null;

  // 🟩 Methods:
  const toggleModalWindow = () => {
    dispatch(toggleModal())
    reset();
  }

  // 🟪 Rendering:
  if (status === 'loading') {
    content = <Spinner />;
  } else {
    content = (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={toggleModalWindow}
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
                  {/*<BookmarkForm/>*/}
                  <button type='button' className='btn' onClick={toggleModalWindow}>Close</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return content;
};

export default Modal;
