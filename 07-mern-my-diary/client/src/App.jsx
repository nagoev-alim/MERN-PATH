// 🔳 Imports:
import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

// 🔳 Custom Imports:
import Routes from '@/routes/Routes.jsx';
import { Spinner } from '@ui/index.js';
import { Layout } from '@layout/index.js';

// 🟥 Component: App
const App = () => {
  // 🟪 Rendering:
  return <Router>
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Routes />
      </Suspense>
    </Layout>
    <Toaster position='bottom-center' containerClassName='font-sans font-medium' />
  </Router>
};

export default App;
