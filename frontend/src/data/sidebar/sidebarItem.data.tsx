import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CodeIcon from '@mui/icons-material/Code';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { ADMIN_PATHS } from '@/constants/admin/admin.path';

export const menuItems = [
  { icon: <DashboardIcon />, label: 'Tổng quan', path: ADMIN_PATHS.DASHBOARD },
  { icon: <ManageAccountsIcon />, label: 'Quản lý người dùng', path: ADMIN_PATHS.USER },
  { icon: <PeopleIcon />, label: 'Quản lý nhóm', path: ADMIN_PATHS.GROUPS },
  { icon: <ImportContactsIcon />, label: 'Quản lý giảng viên', path: ADMIN_PATHS.LECTURERS },
  { icon: <SchoolIcon />, label: 'Quản lý sinh viên', path: ADMIN_PATHS.STUDENTS },
  { icon: <CodeIcon />, label: 'Quản lý kho lưu trữ', path: ADMIN_PATHS.REPOSITORIES },
  { icon: <LinkIcon />, label: 'Quản lý link Jira', path: ADMIN_PATHS.JIRA },
  { icon: <TextSnippetIcon />, label: 'Quản lý báo cáo', path: ADMIN_PATHS.REPORTS },
  { icon: <HourglassEmptyIcon />, label: 'Quản lý kỳ học', path: ADMIN_PATHS.SEMESTER },
];
