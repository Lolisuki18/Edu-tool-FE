import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { SYSTEM_ROLE } from '@/types/role.types';

export const ProtectedRoute: React.FC<{ redirectTo?: string; requireAdmin?: boolean }> = ({
  redirectTo = '/auth/login',
  requireAdmin = false,
}) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (requireAdmin && user?.role !== SYSTEM_ROLE.ADMIN) return <Navigate to="/" replace />;
  return <Outlet />;
};
export default ProtectedRoute;
