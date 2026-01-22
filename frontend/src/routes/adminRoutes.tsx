import { Route } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import GroupManage from '@/pages/admin/GroupManage';
import LectureManage from '@/pages/admin/LectureManage';
import { ADMIN_PATHS } from '@/constants/admin/admin.path';
import StudentManage from '@/pages/admin/StudentManage';
import RepositoryManage from '@/pages/admin/RepositoryManage';
import JiraManage from '@/pages/admin/JiraManage';
import ReportManage from '@/pages/admin/ReportManage';
import SemestersManage from '@/pages/admin/SemestersManage';

import ProtectedRoute from './ProtectedRoute';

export const adminRoutes = (
  <Route element={<ProtectedRoute requireAdmin />}>
    <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="groups" element={<GroupManage />} />
      <Route path="lecturers" element={<LectureManage />} />
      <Route path="students" element={<StudentManage />} />
      <Route path="repositories" element={<RepositoryManage />} />
      <Route path="jira" element={<JiraManage />} />
      <Route path="reports" element={<ReportManage />} />
      <Route path="semesters" element={<SemestersManage />} />
    </Route>
  </Route>
);
