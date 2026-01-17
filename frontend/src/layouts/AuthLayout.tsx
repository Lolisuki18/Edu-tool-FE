import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
