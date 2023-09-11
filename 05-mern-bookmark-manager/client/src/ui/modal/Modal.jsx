import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { Spinner } from '@ui/index.js';
import { categoriesSelector } from '@features/categories/categoriesSlice.js';
import { bookmarksSelector } from '@features/bookmarks/bookmarksSlice.js';
import { BookmarkForm } from '@features/bookmarks/components/index.js';
import { CategoryForm } from '@features/categories/components';
import { useForm } from 'react-hook-form';
/* =============================
📦 Component - Modal
============================= */
export default function Modal({ toggleModal, toggleModalWindow, type, categories }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const { status: categoriesStatus } = useSelector(categoriesSelector);
  const { status: bookmarksStatus } = useSelector(bookmarksSelector);
  const { reset } = useForm();
  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (categoriesStatus === 'loading' || bookmarksStatus === 'loading') return <Spinner />;
  return <Transition.Root show={toggleModal} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={() => toggleModalWindow(reset)}
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
              {type === 'category' && <CategoryForm toggleModalWindow={toggleModalWindow} />}
              {type === 'bookmark' && <BookmarkForm categories={categories} toggleModalWindow={toggleModalWindow} />}
              <button type='button' className='btn' onClick={() => toggleModalWindow(reset)}>Close</button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>;
}
