/* =============================
📦 Custom Imports
============================= */
import { useLocation, useNavigate } from 'react-router-dom';

/* =============================
📦 Component - SignPage
============================= */
import { LoginForm, RegisterForm } from '@features/user/components/index.js';

export default function SignPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const { search } = useLocation();
  let content = null;
  /* =============================
  📦 Section - Methods:
  ============================= */

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
