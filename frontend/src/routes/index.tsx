import { Route, Routes } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import { publicRoutes } from './publicRoutes';
import { authRoutes } from './authRoutes';
import { adminRoutes } from './adminRoutes';

export function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}
      {authRoutes}
      {adminRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
