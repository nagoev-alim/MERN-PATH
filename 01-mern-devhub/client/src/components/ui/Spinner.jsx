import { Ping } from '@uiball/loaders';
/* =============================
📦 Component - Spinner
============================= */
export default function Spinner() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div
      className='fixed top-0 right-0 bottom-0 left-0 w-full min-h-screen grid place-items-center p-3 bg-neutral-800/60'>
      <Ping
        size={90}
        speed={2.5}
        color='#FEFEFE'
      />
    </div>
  );
}
