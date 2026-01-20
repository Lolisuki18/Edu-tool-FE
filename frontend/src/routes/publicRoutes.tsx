import { Route } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import GroupManage from '@/pages/admin/GroupManage';
import LectureManage from '@/pages/admin/LectureManage';
import { ADMIN_PATHS } from '@/constants/admin/admin.path';

export const publicRoutes = (
  // <Route path="/" element={<MainLayout />}>
  //   <Route index element={<HomePage />} />
  //   {/* <Route path="courses" element={<Courses />} /> */}
  // </Route>
  <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="groups" element={<GroupManage />} />
    <Route path="lecturers" element={<LectureManage />} />
  </Route>
);
