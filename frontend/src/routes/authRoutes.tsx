import { Route } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

export const authRoutes = (
  <Route path="/auth" element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />

    {/* Add register, forgot-password, etc. */}
  </Route>
);
