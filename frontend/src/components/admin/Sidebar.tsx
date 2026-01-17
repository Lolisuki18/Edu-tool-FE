import { NavLink } from 'react-router-dom';

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => (
  <aside
    className={`bg-slate-800 text-white transition-all ${
      collapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col`}
  >
    <div className="p-4 flex items-center justify-between">
      {!collapsed && <div className="text-lg font-semibold">Admin</div>}
      <button onClick={onToggle} className="p-1 rounded hover:bg-slate-700">
        {collapsed ? '»' : '«'}
      </button>
    </div>

    <nav className="flex-1 px-2 py-4 space-y-1">
      <NavLink to="/admin" className="block px-3 py-2 rounded hover:bg-slate-700">
        Dashboard
      </NavLink>
      <NavLink to="/admin/users" className="block px-3 py-2 rounded hover:bg-slate-700">
        Users
      </NavLink>
      <NavLink to="/admin/posts" className="block px-3 py-2 rounded hover:bg-slate-700">
        Posts
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
