import type { ReactNode } from 'react';

import type { User } from './user.type';

export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};
