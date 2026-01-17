import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { useState } from 'react';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(s => !s)} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4">Admin Header</header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <footer className="bg-slate-50 border-t p-3 text-sm">Admin footer (optional)</footer>
      </div>
    </div>
  );
};

export default AdminLayout;
