import { createContext, useEffect, useState, type ReactNode } from 'react';

import type { SystemRole } from '@/types/role.types';

export type User = {
  id: string;
  name: string;
  role?: SystemRole;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const v = localStorage.getItem('edu_user');
      return v ? (JSON.parse(v) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('edu_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('edu_user');
      }
    } catch {
      /* ignore storage errors */
    }
  }, [user]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
