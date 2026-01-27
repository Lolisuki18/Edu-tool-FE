import { NavLink } from 'react-router-dom';

import NavMenu from '../navigation/NavMenu';
import UserDropdown from '../navigation/UserDropdown';

const Header = () => {
  return (
    <header className="relative w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-semibold text-primary">
          EduTool
        </NavLink>
        <div className="hidden md:flex items-center justify-center rounded-full bg-background border border-border px-4 py-1.5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-pulse"></span>
          <span className="text-small font-medium text-text-secondary">
            Hệ thống quản lý tiến độ dự án <span className="mx-2 text-border">|</span> Tích hợp
            GitHub & Jira
          </span>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-6">
          <NavMenu role="user" direction="row" />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
