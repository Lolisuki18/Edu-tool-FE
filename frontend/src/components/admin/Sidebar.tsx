import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';

import { ADMIN_PATHS } from '@/constants/admin/admin.path';

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const menuItems = [
  { icon: <DashboardIcon />, label: 'Tổng quan', path: ADMIN_PATHS.DASHBOARD },
  { icon: <PeopleIcon />, label: 'Quản lý nhóm', path: ADMIN_PATHS.GROUPS },
  { icon: <ImportContactsIcon />, label: 'Quản lý Giảng viên', path: ADMIN_PATHS.LECTURERS },
  { icon: <SchoolIcon />, label: 'Quản lý Sinh viên', path: ADMIN_PATHS.STUDENTS },
  { icon: <CodeIcon />, label: 'Quản lý Repository', path: ADMIN_PATHS.REPOSITORIES },
  { icon: <LinkIcon />, label: 'Quản lý Link Jira', path: ADMIN_PATHS.JIRA },
  { icon: <TextSnippetIcon />, label: 'Quản lý Report', path: ADMIN_PATHS.REPORTS },
  { icon: <SettingsIcon />, label: 'Cài đặt', path: ADMIN_PATHS.SETTINGS },
];

const Sidebar = ({ collapsed = false }: SidebarProps) => (
  <aside
    className={`bg-gradient-to-b from-indigo-700 to-indigo-900 text-white transition-all ${
      collapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col sticky top-0`}
  >
    {/* Logo Section */}
    <div className="p-6 flex items-center gap-3">
      <div className="bg-white rounded-lg p-2 flex items-center justify-center w-10 h-10">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-700" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      </div>
      {!collapsed && (
        <div>
          <div className="text-lg font-bold">EduTools</div>
          <div className="text-xs text-indigo-200">Admin Portal</div>
        </div>
      )}
    </div>

    {/* Navigation Menu */}
    <nav className="flex-1 px-3 py-4 space-y-1">
      {menuItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === ADMIN_PATHS.DASHBOARD}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-white text-indigo-700 font-medium'
                : 'text-white hover:bg-indigo-600/50'
            }`
          }
        >
          <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
          {!collapsed && <span className="text-sm align-middle">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
