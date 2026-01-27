import { useEffect, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';

import userService from '@/services/user.service';
import { SYSTEM_ROLE } from '@/types/role.types';
import { translateRole, translateStatus } from '@/utils';
import type { Users } from '@/types/interface';
import UserModal from '@/components/user/UserModal';

export const UserManage = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const handleOpenCreate = () => {
    setIsCreateMode(true);
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenUpdate = (user: Users) => {
    setIsCreateMode(false);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchUsers(page);
  };

  const fetchUsers = async (pageNumber: number) => {
    try {
      const res = await userService.getAllUser(pageNumber, 10);
      console.log(res);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-900">Quản lý người dùng</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2"
        >
          <PersonAddAltIcon />
          Thêm người dùng
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-indigo-900 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-sm">Username</th>
              <th className="p-4 font-semibold text-sm">Họ và tên</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Vai trò</th>
              <th className="p-4 font-semibold text-sm">Trạng thái</th>
              <th className="p-4 font-semibold text-sm text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId} className="hover:bg-indigo-50/30 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-700">{user.username}</td>
                <td className="p-4 text-sm text-gray-600">{user.fullName}</td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>

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

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Xem"
                    >
                      <VisibilityIcon />
                    </button>
                    <button
                      onClick={() => handleOpenUpdate(user)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Sửa"
                    >
                      <UpgradeIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Trang {page + 1} / {totalPages}
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
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCreate={isCreateMode}
        onSuccess={handleSuccess}
        userData={selectedUser}
      />
    </div>
  );
};
