import { BsHeartFill } from 'react-icons/bs';
/* =============================
📦 Component - Footer
============================= */
export default function Footer() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <footer className='footer'>
      <p className='flex flex-wrap gap-1 items-center justify-center'>Created with <BsHeartFill className='text-red-500' /> by
        <a className='font-bold' target='_blank' href='https://github.com/nagoev-alim'>Alim Nagoev</a>
      </p>
    </footer>
  );
}
