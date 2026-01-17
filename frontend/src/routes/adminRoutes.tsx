import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
// import AdminDashboard from '../pages/admin/Dashboard';

export const adminRoutes = (
  <Route element={<ProtectedRoute requireAdmin />}>
    <Route path="/admin" element={<AdminLayout />}>
      {/* <Route index element={<AdminDashboard />} /> */}
      {/* Add admin child routes here (users, posts, etc.) */}
    </Route>
  </Route>
);
