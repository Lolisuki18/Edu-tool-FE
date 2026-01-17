import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export const publicRoutes = (
  <Route path="/" element={<MainLayout />}>
    {/* <Route index element={<Home />} /> */}
    {/* <Route path="courses" element={<Courses />} /> */}
  </Route>
);
