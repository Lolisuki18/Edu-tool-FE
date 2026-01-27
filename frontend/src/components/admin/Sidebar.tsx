import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { ADMIN_PATHS } from '@/constants/admin/admin.path';
import { menuItems } from '@/data/sidebar/sidebarItem.data';

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const renderNavItem = (item: (typeof menuItems)[0], collapsed: boolean) => (
  <NavLink
    key={item.path}
    to={item.path}
    end={item.path === ADMIN_PATHS.DASHBOARD}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        isActive
          ? 'bg-background text-primary font-semibold shadow-sm'
          : 'text-white hover:bg-primary-hover hover:text-white'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`w-6 h-6 flex items-center justify-center ${isActive ? 'text-primary' : 'text-white'}`}
        >
          {item.icon}
        </span>
        {!collapsed && <span className="text-small align-middle">{item.label}</span>}
      </>
    )}
  </NavLink>
);

const Sidebar = ({ collapsed = false }: SidebarProps) => (
  <aside
    className={`bg-primary text-white transition-all ${
      collapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col sticky top-0 border-r border-border`}
    style={{ fontFamily: 'Inter, Roboto, Source Sans 3, IBM Plex Sans, Arial, sans-serif' }}
  >
    {/* Logo Section */}
    <div className="p-6 flex items-center gap-3">
      <div className="bg-background rounded-lg p-2 flex items-center justify-center w-10 h-10 border border-border">
        <DashboardIcon fontSize="medium" className="text-primary" />
      </div>
      {!collapsed && (
        <div>
          <div className="text-h3 font-bold text-white">EduTools</div>
          <div className="text-caption text-blue-200 font-medium">Admin Portal</div>
        </div>
      )}
    </div>

    <nav className="flex-1 px-3 py-4 space-y-1">
      {menuItems.map(item => renderNavItem(item, collapsed))}
    </nav>
  </aside>
);

export default Sidebar;
