import { createContext, useEffect, useState } from 'react';

import type { User } from '@/types/user.type';
import type { AuthContextType, AuthProviderProps } from '@/types/auth.type';

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
        localStorage.removeItem('edu_token');
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
