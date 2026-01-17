import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
// import Login from '../pages/auth/Login';

export const authRoutes = (
  <Route path="/auth" element={<AuthLayout />}>
    {/* <Route path="login" element={<Login />} /> */}
    {/* Add register, forgot-password, etc. */}
  </Route>
);
