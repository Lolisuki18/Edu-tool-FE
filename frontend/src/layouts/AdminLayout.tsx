import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(s => !s)} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
