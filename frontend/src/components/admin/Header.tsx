import { useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { ADMIN_PATHS } from '@/constants/admin/admin.path';

const routeNames: Record<string, string> = {
  [ADMIN_PATHS.DASHBOARD]: 'Tổng quan',
  [ADMIN_PATHS.GROUPS]: 'Quản lý nhóm',
  [ADMIN_PATHS.LECTURERS]: 'Quản lý Giảng viên',
  [ADMIN_PATHS.STUDENTS]: 'Quản lý Sinh viên',
  [ADMIN_PATHS.REPOSITORIES]: 'Quản lý Repository',
  [ADMIN_PATHS.JIRA]: 'Quản lý Link Jira',
  [ADMIN_PATHS.REPORTS]: 'Quản lý Report',
  [ADMIN_PATHS.SETTINGS]: 'Cài đặt',
};

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = routeNames[currentPath] || 'Admin';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Page Title & Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Admin Dashboard</span>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">{pageName}</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
