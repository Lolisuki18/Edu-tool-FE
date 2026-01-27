import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import { ConfirmProvider } from './components/confirm/ConfirmProvider';

export default function App() {
  return (
    <>
      <AuthProvider>
        <ConfirmProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <AppRoutes />
          </BrowserRouter>
        </ConfirmProvider>
      </AuthProvider>
    </>
  );
}
