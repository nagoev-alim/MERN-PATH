import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { Footer, Header, Layout, Main } from './layout/index.js';
import { Spinner } from './ui/index.js';
import Routes from '../routes/Routes.jsx';

/* =============================
📦 Component - App
============================= */
export default function App() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <Router>
      <Layout>
        <Header />
        <Main>
          <Suspense fallback={<Spinner />}>
            <Routes />
          </Suspense>
        </Main>
        <Footer/>
      </Layout>
      <Toaster position='bottom-center'/>
    </Router>
  );
}
