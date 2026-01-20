import { NavLink } from 'react-router-dom';

import { NAV_ITEMS } from './nav.config';

type Props = {
  role?: 'guest' | 'user' | 'admin';
  direction?: 'row' | 'col';
};

const NavMenu = ({ role = 'guest', direction = 'row' }: Props) => {
  return (
    <nav className={`flex ${direction === 'row' ? 'gap-6' : 'flex-col gap-2'}`}>
      {NAV_ITEMS.filter(item => !item.roles || item.roles.includes(role)).map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-sm font-medium ${isActive ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavMenu;
