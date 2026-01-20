import { Route } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';

import ProtectedRoute from './ProtectedRoute';

export const adminRoutes = (
  <Route element={<ProtectedRoute requireAdmin />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      {/* Add admin child routes here (users, posts, etc.) */}
    </Route>
  </Route>
);
