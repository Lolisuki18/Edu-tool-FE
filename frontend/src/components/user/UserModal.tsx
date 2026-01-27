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
import { USER_ACTION, type UserAction } from '@/types/user.type';
import { SYSTEM_ROLE } from '@/types/role.types';
import type { Users } from '@/interface';
import { COLORS } from '@/theme';

import CustomSelect from '../common/CustomSelect';
import ErrorField from '../common/ErrorField';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  action: UserAction;
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

const UserModal = ({ isOpen, onClose, action, onSuccess, userData }: Props) => {
  const {
    formData,
    loading,
    error,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    fieldErrors,
  } = useUserForm(onSuccess, action, userData, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop transition-opacity">
      <div className="bg-background w-full max-w-lg rounded-3xl shadow-2xl border-border border overflow-visible animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className="px-8 py-5 border-b border-border flex justify-between items-center rounded-t-3xl bg-background">
          <div>
            <h2 className="text-academic-h1">
              {action == USER_ACTION.CREATE
                ? 'Thêm Thành Viên'
                : action == USER_ACTION.UPDATE
                  ? 'Cập Nhật Thông Tin'
                  : 'Thông tin thành viên'}
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
            {action == USER_ACTION.CREATE && (
              <div className="group space-y-1.5 animate-in slide-in-from-top-4 duration-500">
                <label className="text-body font-medium ml-1 tracking-wide transition-colors text-primary">
                  Tên tài khoản
                </label>
                <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                  <PersonOutlineIcon fontSize="small" className="text-primary flex-shrink-0" />
                  <input
                    name="username"
                    required
                    className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
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
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <BadgeOutlinedIcon fontSize="small" className="text-primary flex-shrink-0" />
                <input
                  name="fullName"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
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
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <AlternateEmailIcon fontSize="small" className="text-primary flex-shrink-0" />
                <input
                  name="email"
                  type="email"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
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
                <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                  <LockOutlinedIcon fontSize="small" className="text-primary flex-shrink-0" />
                  <div className="flex-1 relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required={action == USER_ACTION.CREATE}
                      className="w-full pr-9 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
                      placeholder="••••••••"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg transition-all duration-200 flex items-center justify-center text-primary hover:bg-border/50 p-1"
                      title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 18 }} />
                      )}
                    </button>
                  </div>
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
              style={{
                backgroundColor: action == USER_ACTION.CREATE ? COLORS.primary : COLORS.success,
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor =
                  action == USER_ACTION.CREATE ? COLORS.primaryHover : COLORS.successLight)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor =
                  action == USER_ACTION.CREATE ? COLORS.primary : COLORS.success)
              }
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin-smooth"></div>
              ) : action == USER_ACTION.CREATE ? (
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
