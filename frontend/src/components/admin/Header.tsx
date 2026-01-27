import { useLocation, useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import { ADMIN_PATHS } from '@/constants/admin/admin.path';
import { AUTH_PATHS } from '@/constants/auth/auth.path';
import { useAuth } from '@/hooks/useAuth';

const routeNames: Record<string, string> = {
  [ADMIN_PATHS.DASHBOARD]: 'Tổng quan',
  [ADMIN_PATHS.GROUPS]: 'Quản lý nhóm',
  [ADMIN_PATHS.LECTURERS]: 'Quản lý Giảng viên',
  [ADMIN_PATHS.STUDENTS]: 'Quản lý Sinh viên',
  [ADMIN_PATHS.REPOSITORIES]: 'Quản lý Repository',
  [ADMIN_PATHS.JIRA]: 'Quản lý Link Jira',
  [ADMIN_PATHS.REPORTS]: 'Quản lý Report',
  [ADMIN_PATHS.USER]: 'Quản lý người dùng',
};

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = routeNames[currentPath] || 'Admin';
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(AUTH_PATHS.LOGIN);
    logout();
  };
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Page Title & Breadcrumb */}
        <div className="flex items-center gap-2 text-small">
          <span className="text-secondary">Admin Dashboard</span>
          <ChevronRightIcon className="w-4 h-4 text-secondary" />
          <span className="text-text-primary font-semibold">{pageName}</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-small text-error hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogoutIcon className="w-5 h-5" />
            Đăng xuất
          </button>
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <div className="text-small font-semibold text-text-primary">Admin User</div>
              <div className="text-caption text-secondary">Administrator</div>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <AdminPanelSettingsIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
