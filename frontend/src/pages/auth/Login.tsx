import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: String(Date.now()), name: name || 'Anonymous', role };
    login(user);
    if (role === 'admin') navigate('/admin');
    else navigate('/');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Login (placeholder)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
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
            onChange={e => setRole(e.target.value as any)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-sky-600 text-white px-4 py-2 rounded">Login</button>
          <button
            type="button"
            onClick={() => {
              login({ id: 'guest', name: 'Guest', role: 'user' });
              navigate('/');
            }}
            className="text-sm text-slate-600"
          >
            Quick guest
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
