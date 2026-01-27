import type { NavItemConfig } from '@/types/nav.types';

export const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Home', to: '/', roles: ['guest', 'user', 'admin'] },
  { label: 'Courses', to: '/courses', roles: ['guest', 'user', 'admin'] },
  { label: 'About', to: '/about', roles: ['guest', 'user', 'admin'] },
  { label: 'Admin', to: '/admin', roles: ['admin'] },
];
