import { useEffect, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import userService from '@/services/user.service';
import { SYSTEM_ROLE, type SystemRole } from '@/types/role.types';
import { showError, showSuccess, translateRole, translateStatus } from '@/utils';
import { ExportCSV } from '@/utils/exportCSV';
import type { Users } from '@/interface';
import UserModal from '@/components/user/UserModal';
import { USER_ACTION, type UserAction, type UserStatus } from '@/types/user.type';
import { useConfirm } from '@/hooks/useConfirm';
import { CONFIRM_VARIANT } from '@/types/confirm.types';
import ExportFileNameModal from '@/components/csv/ExportFileNameModal';
import csvService from '@/services/csv.service';
import { USER_PATH } from '@/constants/user/user.path';
import { ImportCSVModal } from '@/components/csv/ImportModal';

export const UserManage = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const [isAction, setIsAction] = useState<UserAction>();
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const [isModalOpenCSV, setIsModalOpenCSV] = useState(false);
  const [isModalOpenImport, setIsModalOpenImport] = useState(false);

  const confirm = useConfirm();

  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: 'Xoá người dùng',
      message: 'Bạn có chắc là mình muốn xoá người dùng này?',
      variant: CONFIRM_VARIANT.DANGER,
      confirmText: 'Xoá',
      cancelText: 'Huỷ',
    });
    if (!ok) return;
    const response = await userService.deleteUser(id);
    if (response.success) {
      showSuccess('Đã xoá người dùng thành công');
      fetchUsers(page);
      return;
    } else {
      showError('Xoá không thành công');
    }
  };
  const handleOpenCreate = () => {
    setIsAction(USER_ACTION.CREATE);
    setSelectedUser(null);
    setIsModalOpenUser(true);
  };

  const handleOpenUpdate = (user: Users) => {
    setIsAction(USER_ACTION.UPDATE);
    setSelectedUser(user);
    setIsModalOpenUser(true);
  };

  const handleViewUser = async (user: Users) => {
    const response = await userService.getUserById(user.userId);
    if (response.success) {
      showSuccess('Lấy người dùng thành công');
    } else {
      showError('Không tìm thấy ID người dùng để xem.');
    }
    console.log(response.data);
    setIsAction(USER_ACTION.VIEW);
    setSelectedUser(response.data);
    setIsModalOpenUser(true);
  };

  const handleSuccess = () => {
    setIsModalOpenUser(false);
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

  const renderRoleBadge = (role: SystemRole) => {
    let className = 'rounded px-2 py-1 text-caption font-semibold ';
    if (role === SYSTEM_ROLE.ADMIN) {
      className += 'bg-red-50 text-error';
    } else if (role === SYSTEM_ROLE.LECTURER) {
      className += 'bg-blue-50 text-info';
    } else {
      className += 'bg-background text-secondary';
    }
    return <span className={className}>{translateRole(role)}</span>;
  };

  const renderStatusBadge = (status: UserStatus) => {
    const className = `rounded px-2 py-1 text-caption font-semibold ${
      status === 'ACTIVE' ? 'bg-green-50 text-success' : 'bg-background text-secondary'
    }`;
    return <span className={className}>{translateStatus(status)}</span>;
  };

  const executeExport = async (finalFileName: string) => {
    const response = await csvService.exportCsv(`${USER_PATH.EXPORT_CSV}`);
    await ExportCSV(response, finalFileName);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-academic-h1">Quản lý người dùng</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpenImport(true)}
            className="btn-secondary flex items-center gap-2"
            type="button"
          >
            <FileUploadIcon />
            Nhập file CSV
          </button>

          <button
            onClick={() => setIsModalOpenCSV(true)}
            className="btn-secondary flex items-center gap-2"
            type="button"
          >
            Xuất file CSV
          </button>

          <button onClick={handleOpenCreate} className="btn-primary flex items-center gap-2">
            <PersonAddAltIcon />
            Thêm người dùng
          </button>
        </div>
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
                <td className="p-3">{renderRoleBadge(user.role)}</td>
                <td className="p-3">{renderStatusBadge(user.status)}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleViewUser(user)}
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
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="p-2 rounded-lg transition-colors text-warning hover:bg-orange-50"
                      title="Xoá"
                    >
                      <DeleteIcon />
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
        isOpen={isModalOpenUser}
        onClose={() => setIsModalOpenUser(false)}
        action={isAction as UserAction}
        onSuccess={handleSuccess}
        userData={selectedUser}
      />

      <ExportFileNameModal
        isOpen={isModalOpenCSV}
        onClose={() => setIsModalOpenCSV(false)}
        onConfirm={executeExport}
        defaultFileName={`users_export_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}`}
      />

      <ImportCSVModal
        isOpen={isModalOpenImport}
        onClose={() => setIsModalOpenImport(false)}
        onSuccess={handleSuccess}
        endpoint={`${USER_PATH.IMPORT_CSV}`}
        title="Nhập người dùng từ file CSV"
      />
    </div>
  );
};
