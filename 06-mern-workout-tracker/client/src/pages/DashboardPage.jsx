import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
/* =============================
📦 Custom Imports
============================= */
import { userSelector } from '@features/user/userSlice.js';
import { Modal } from '@ui/index.js';
import { ExerciseList } from '@features/exercises/components/index.js';
import { BsFillJournalBookmarkFill, MdOutlineMedicalInformation } from 'react-icons/all.js';
/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const { user } = useSelector(userSelector);
  const [isOpen, setIsOpen] = useState(false);
  const { reset } = useForm();
  const toggleModal = () => {
    setIsOpen(p => !p);
    reset();
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.username ?? ''} Dashboard</h1>
    {user.bmi && <h2 className='flex flex-wrap items-center justify-center gap-1 font-bold text-xl'>
      <MdOutlineMedicalInformation size={35} />
      Your body mass index (BMI): <span className='bg-amber-50 border-2 border-amber-300 p-1'>{user.bmi}</span>
    </h2>
    }
    {/* Button */}
    <button
      className='btn btn-primary w-[50px] h-[50px] p-1 rounded-full fixed bottom-5 right-5 text-amber-300 border-amber-300'
      onClick={toggleModal}>
      <RiAddLine size={25} />
    </button>
    {/* Modal */}
    <Modal isOpen={isOpen} toggleModal={toggleModal} />
    {/* Lists */}
    <ExerciseList />
  </div>;
}
