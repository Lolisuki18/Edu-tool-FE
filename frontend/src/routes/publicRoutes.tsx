import { Route } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';

export const publicRoutes = (
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />} />
    {/* <Route path="courses" element={<Courses />} /> */}
  </Route>
);
