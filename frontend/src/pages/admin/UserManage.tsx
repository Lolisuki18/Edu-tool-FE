import { useEffect, useState } from 'react';

import userService from '@/services/user.service';
import { SYSTEM_ROLE } from '@/types/role.types';
import { translateRole, translateStatus } from '@/utils';

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}

export const UserManage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (pageNumber: number) => {
    try {
      const res = await userService.getAllUser(pageNumber, 10);
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsers(page);
    })();
  }, [page]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-500">Quản lý người dùng</h1>
        <p className="text-gray-500">Quản lý người dùng toàn hệ thống</p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-blue-950">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId} className="border-t hover:bg-gray-50 ">
                <td className="p-3 text-black">{user.username}</td>
                <td className="p-3 text-black">{user.fullName}</td>
                <td className="p-3 text-black">{user.email}</td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold
                    ${user.role === SYSTEM_ROLE.ADMIN && 'bg-red-100 text-red-600'}
                    ${user.role === SYSTEM_ROLE.LECTURER && 'bg-blue-100 text-blue-600'}
                    ${user.role === SYSTEM_ROLE.STUDENT && 'bg-gray-100 text-gray-600'}
                  `}
                  >
                    {translateRole(user.role)}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold
                    ${
                      user.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }
                  `}
                  >
                    {translateStatus(user.status)}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-yellow-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Page {page + 1} / {totalPages}
        </span>

        <div className="space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Trước đó
          </button>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};
