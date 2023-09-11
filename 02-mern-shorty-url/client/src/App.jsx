import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
/* =============================
📦 Custom Imports
============================= */
import Routes from '@/routes/Routes.jsx';
import { Spinner } from '@ui/index.js';
import { Layout } from '@layout/index.js';
import useUser from '@/hooks/useUser.jsx';
/* =============================
📦 Component - App
============================= */
export default function App() {
  const [status] = useUser();
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return status === 'loading'
    ? <Spinner />
    : <Router>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes />
        </Suspense>
      </Layout>
      <Toaster position='top-right' />
    </Router>;
}
