import { Routes } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';
import { authRoutes } from './authRoutes';
import { adminRoutes } from './adminRoutes';

export function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}
      {authRoutes}
      {adminRoutes}
    </Routes>
  );
}
