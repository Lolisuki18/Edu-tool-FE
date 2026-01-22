import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { SYSTEM_ROLE, type SystemRole } from '@/types/role.types';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState<SystemRole>(SYSTEM_ROLE.STUDENT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: String(Date.now()), name: name || 'Anonymous', role };
    login(user);
    if (role === SYSTEM_ROLE.ADMIN) navigate('/admin');
    else navigate('/');
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value as SystemRole)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={SYSTEM_ROLE.STUDENT}>User</option>
            <option value={SYSTEM_ROLE.ADMIN}>Admin</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-sky-600 text-white px-4 py-2 rounded">Login</button>
          <button
            type="button"
            onClick={() => {
              login({ id: 'guest', name: 'Guest', role: SYSTEM_ROLE.STUDENT });
              navigate('/');
            }}
            className="text-sm text-slate-600"
          >
            Quick guest
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
