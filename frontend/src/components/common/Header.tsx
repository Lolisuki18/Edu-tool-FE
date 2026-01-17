import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="w-full bg-white border-b">
    <div className="max-w-7xl mx-auto w-full px-4 py-3 flex items-center justify-between">
      <NavLink to="/" className="text-xl font-semibold">
        EduTool
      </NavLink>
      <nav aria-label="Main" className="hidden md:flex gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'text-sky-600' : 'text-slate-700')}
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? 'text-sky-600' : 'text-slate-700')}
        >
          Courses
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'text-sky-600' : 'text-slate-700')}
        >
          About
        </NavLink>
      </nav>
      <div className="flex items-center gap-3">
        <NavLink to="/auth/login" className="text-sm text-slate-700">
          Login
        </NavLink>
        <button aria-label="Toggle menu" className="md:hidden p-2 rounded hover:bg-slate-100">
          ☰
        </button>
      </div>
    </div>
  </header>
);

export default Header;
