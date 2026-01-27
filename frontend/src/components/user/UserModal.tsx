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
    icon: <PersonIcon fontSize="small" className="text-gray-400" />,
  },
  {
    value: SYSTEM_ROLE.LECTURER,
    label: 'Giáo viên',
    icon: <SchoolIcon fontSize="small" className="text-indigo-500" />,
  },
  {
    value: SYSTEM_ROLE.ADMIN,
    label: 'Quản trị viên',
    icon: <AdminPanelSettingsIcon fontSize="small" className="text-rose-500" />,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px] transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-visible animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
        {/* Header - Modern Design */}
        <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-indigo-50/50 to-transparent rounded-t-3xl">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {isCreate ? 'Thêm Thành Viên' : 'Cập Nhật Thông Tin'}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                Edu Tools System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-md rounded-full text-slate-400 hover:text-rose-500 transition-all duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 text-sm text-rose-700 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
              <div className="w-1 h-6 bg-rose-500 rounded-full"></div>
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Username Section (Conditional) */}
            {isCreate && (
              <div className="group space-y-1.5 animate-in slide-in-from-top-4 duration-500">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
                  Tên tài khoản
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                    <PersonOutlineIcon fontSize="small" />
                  </div>
                  <input
                    name="username"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
                    placeholder="Ví dụ: nguyenvana_edu"
                    onChange={handleChange}
                    value={(formData as any).username || ''}
                  />
                </div>
              </div>
            )}

            {/* Họ và Tên */}
            <div className="group space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                  <BadgeOutlinedIcon fontSize="small" />
                </div>
                <input
                  name="fullName"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200 font-medium text-slate-700 shadow-sm"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>
            </div>

            {/* Email */}
            <div className="group space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
                Email học đường
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                  <AlternateEmailIcon fontSize="small" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200 font-medium text-slate-700 shadow-sm"
                  placeholder="name@edutools.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            {/* Role & Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CustomSelect
                label="Vai trò"
                name="role"
                value={formData.role}
                options={ROLE_OPTIONS}
                onChange={val => handleChange({ target: { name: 'role', value: val } } as any)}
              />

              <div className="group space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                    <LockOutlinedIcon fontSize="small" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required={isCreate}
                    className="w-full pl-11 pr-12 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200 font-medium text-slate-700 shadow-sm"
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={formData.password}
                  />

                  {/* Nút con mắt thay thế cho chữ Ẩn/Hiện */}
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
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

          {/* Action Buttons - Distinct styles */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-6 py-3.5 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-700 rounded-2xl transition-all duration-200"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:flex-[1.5] px-6 py-3.5 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-200/50 transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 
                ${
                  isCreate
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
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
