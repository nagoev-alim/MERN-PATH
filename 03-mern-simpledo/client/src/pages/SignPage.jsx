import { useLocation } from 'react-router-dom';
/* =============================
📦 Custom Imports
============================= */
import { LoginForm, RegisterForm } from '@features/user/components/index.js';
/* =============================
📦 Component - SignPage
============================= */
export default function SignPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const { search } = useLocation();
  let content = null;
  /* =============================
  📦 Section - Rendering:
  ============================= */
  content = <div className='grid min-h-full place-items-center p-3'>
    <div className='max-w-lg w-full'>
      {search.split('?')[1] === 'register' ? <RegisterForm /> : <LoginForm />}
    </div>
  </div>;

  return content
}
