import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useUserForm } from '@/hooks/user';
import { SYSTEM_ROLE } from '@/types/role.types';
import type { Users } from '@/types/interface';
import { COLORS } from '@/theme';

import CustomSelect from '../common/CustomSelect';
import ErrorField from '../common/ErrorField';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isCreate: boolean;
  onSuccess: () => void;
  userData?: Users | null;
}

const ROLE_OPTIONS = [
  {
    value: SYSTEM_ROLE.STUDENT,
    label: 'Học sinh',
    icon: <PersonIcon fontSize="small" className="text-secondary" />,
  },
  {
    value: SYSTEM_ROLE.LECTURER,
    label: 'Giáo viên',
    icon: <SchoolIcon fontSize="small" className="text-primary" />,
  },
  {
    value: SYSTEM_ROLE.ADMIN,
    label: 'Quản trị viên',
    icon: <AdminPanelSettingsIcon fontSize="small" className="text-error" />,
  },
];

const UserModal = ({ isOpen, onClose, isCreate, onSuccess, userData }: Props) => {
  const {
    formData,
    loading,
    error,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    fieldErrors,
  } = useUserForm(onSuccess, isCreate, userData, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop transition-opacity">
      <div className="bg-background w-full max-w-lg rounded-3xl shadow-2xl border-border border overflow-visible animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className="px-8 py-5 border-b border-border flex justify-between items-center rounded-t-3xl bg-background">
          <div>
            <h2 className="text-academic-h1">
              {isCreate ? 'Thêm Thành Viên' : 'Cập Nhật Thông Tin'}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <p className="text-caption font-medium uppercase tracking-widest text-primary">
                Edu Tools System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background hover:shadow-md rounded-full transition-all duration-200 text-primary"
            aria-label="Đóng"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 text-small text-error bg-red-50 rounded-2xl border border-red-300 flex items-center gap-3">
              <div className="w-1 h-6 bg-error rounded-full"></div>
              {error}
            </div>
          )}

          <div className="space-y-5">
            {isCreate && (
              <div className="group space-y-1.5 animate-in slide-in-from-top-4 duration-500">
                <label className="text-body font-medium ml-1 tracking-wide transition-colors text-primary">
                  Tên tài khoản
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                    <PersonOutlineIcon fontSize="small" />
                  </div>
                  <input
                    name="username"
                    required
                    className="input-academic pl-11"
                    placeholder="Ví dụ: nguyenvana_edu"
                    onChange={handleChange}
                    value={(formData as any).username || ''}
                  />
                </div>
              </div>
            )}
            <div className="group space-y-1.5">
              <label className="text-body font-medium ml-1 tracking-wide transition-colors text-primary">
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                  <BadgeOutlinedIcon fontSize="small" />
                </div>
                <input
                  name="fullName"
                  required
                  className="input-academic pl-11"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>
            </div>

            <div className="group space-y-1.5">
              <label className="text-body font-medium ml-1 tracking-wide transition-colors text-primary">
                Email học đường
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                  <AlternateEmailIcon fontSize="small" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="input-academic pl-11"
                  placeholder="name@edutools.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CustomSelect
                label="Vai trò"
                name="role"
                value={formData.role}
                options={ROLE_OPTIONS}
                onChange={val => handleChange({ target: { name: 'role', value: val } } as any)}
              />

              <div className="group space-y-1.5">
                <label className="text-body font-medium ml-1 tracking-wide transition-colors text-primary">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                    <LockOutlinedIcon fontSize="small" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required={isCreate}
                    className="input-academic pl-11 pr-12"
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={formData.password}
                  />

                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl transition-all duration-200 h-7 w-7 flex items-center justify-center text-primary"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </button>
                </div>
                <ErrorField errors={fieldErrors} field="password" />
              </div>
            </div>
          </div>

          {/* Action Buttons - Academic Style */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-border">
            <button type="button" onClick={onClose} className="btn-secondary w-full sm:flex-1">
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-[1.5] text-white font-semibold rounded-2xl shadow-xl transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 text-body disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5"
              style={{ backgroundColor: isCreate ? COLORS.primary : COLORS.success }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = isCreate
                  ? COLORS.primaryHover
                  : COLORS.successLight)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = isCreate ? COLORS.primary : COLORS.success)
              }
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin-smooth"></div>
              ) : isCreate ? (
                'Xác nhận tạo'
              ) : (
                'Lưu thay đổi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
