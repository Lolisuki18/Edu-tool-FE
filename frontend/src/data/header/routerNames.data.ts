import { ADMIN_PATHS } from '@/constants/admin/admin.path';

export const routeNames: Record<string, string> = {
  [ADMIN_PATHS.DASHBOARD]: 'Tổng quan',
  [ADMIN_PATHS.GROUPS]: 'Quản lý nhóm',
  [ADMIN_PATHS.LECTURERS]: 'Quản lý Giảng viên',
  [ADMIN_PATHS.STUDENTS]: 'Quản lý Sinh viên',
  [ADMIN_PATHS.REPOSITORIES]: 'Quản lý Repository',
  [ADMIN_PATHS.JIRA]: 'Quản lý Link Jira',
  [ADMIN_PATHS.REPORTS]: 'Quản lý Report',
  [ADMIN_PATHS.USER]: 'Quản lý người dùng',
};
