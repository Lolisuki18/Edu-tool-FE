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
        <h1 className="text-academic-h1">Quản lý người dùng</h1>
        <button onClick={handleOpenCreate} className="btn-primary flex items-center gap-2">
          <PersonAddAltIcon />
          Thêm người dùng
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-left">
          <thead className="bg-background text-text-primary border-b border-border">
            <tr>
              <th className="p-4 font-semibold text-small">Username</th>
              <th className="p-4 font-semibold text-small">Họ và tên</th>
              <th className="p-4 font-semibold text-small">Email</th>
              <th className="p-4 font-semibold text-small">Vai trò</th>
              <th className="p-4 font-semibold text-small">Trạng thái</th>
              <th className="p-4 font-semibold text-small text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId} className="hover:bg-background transition-colors">
                <td className="p-4 text-small font-medium text-text-primary">{user.username}</td>
                <td className="p-4 text-small text-text-secondary">{user.fullName}</td>
                <td className="p-4 text-small text-text-secondary">{user.email}</td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-caption font-semibold
                    ${
                      user.role === SYSTEM_ROLE.ADMIN
                        ? 'bg-red-50 text-error'
                        : user.role === SYSTEM_ROLE.LECTURER
                          ? 'bg-blue-50 text-info'
                          : 'bg-background text-secondary'
                    }
                  `}
                  >
                    {translateRole(user.role)}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-caption font-semibold
                    ${user.status === 'ACTIVE' ? 'bg-green-50 text-success' : 'bg-background text-secondary'}
                  `}
                  >
                    {translateStatus(user.status)}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 rounded-lg transition-colors text-info hover:bg-blue-50"
                      title="Xem"
                    >
                      <VisibilityIcon />
                    </button>
                    <button
                      onClick={() => handleOpenUpdate(user)}
                      className="p-2 rounded-lg transition-colors text-warning hover:bg-orange-50"
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
        <span className="text-small text-text-secondary">
          Trang {page + 1} / {totalPages}
        </span>

        <div className="space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="btn-secondary disabled:opacity-50"
          >
            Trước đó
          </button>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="btn-secondary disabled:opacity-50"
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
