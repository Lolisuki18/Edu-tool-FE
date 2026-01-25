import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
