import { Route } from 'react-router-dom';

import AuthRedirector from '@/pages/auth/AuthRedirector';
import HomePage from '@/pages/home/HomePage';
import MainLayout from '@/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';

export const publicRoutes = (
  <>
    <Route path="/" element={<AuthRedirector />} />
    <Route element={<ProtectedRoute requireRole />}>
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="courses" element={<Courses />} /> */}
      </Route>
    </Route>
  </>
);
