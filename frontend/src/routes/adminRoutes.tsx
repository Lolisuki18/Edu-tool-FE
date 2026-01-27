import { Route } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import { ADMIN_PATHS } from '@/constants/admin/admin.path';
import {
  Dashboard,
  GroupManage,
  JiraManage,
  LectureManage,
  ReportManage,
  RepositoryManage,
  SemestersManage,
  StudentManage,
  UserManage,
} from '@/pages/admin';

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
      <Route path="users" element={<UserManage />} />
    </Route>
  </Route>
);
