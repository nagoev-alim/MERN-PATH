// 🔳 Imports:
import { useLocation } from 'react-router-dom';

// 🔳 Custom Imports:
import { LoginForm, RegisterForm } from '@features/user/components/index.js';

// 🟥 Component: SignPage
const SignPage = () => {
  // 🟨 Variables & Hooks:
  const { search } = useLocation();

  // 🟪 Rendering:
  return (
    <div className='grid min-h-full place-items-center p-3'>
      <div className='max-w-lg w-full'>
        {search.split('?')[1] === 'register' ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default SignPage;
