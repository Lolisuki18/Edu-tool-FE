import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { SYSTEM_ROLE } from '@/types/role.types';

export const ProtectedRoute: React.FC<{
  redirectTo?: string;
  requireAdmin?: boolean;
  requireRole?: boolean;
}> = ({ redirectTo = '/auth/login', requireAdmin = false, requireRole = false }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (requireAdmin && user?.role !== SYSTEM_ROLE.ADMIN) return <Navigate to="/" replace />;
  if (requireRole && user?.role !== SYSTEM_ROLE.LECTURER && user?.role !== SYSTEM_ROLE.STUDENT)
    return <Navigate to="/" replace />;
  return <Outlet />;
};
export default ProtectedRoute;
