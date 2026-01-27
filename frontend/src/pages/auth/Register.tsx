import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  GitBranch,
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WavingHandIcon from '@mui/icons-material/WavingHand';

import { AUTH_PATHS } from '@/constants/auth/auth.path';
import authService from '@/services/auth.service';
import type { ErrorDetail } from '@/types/interface/api.interface';
import ErrorField from '@/components/common/ErrorField';
import { successWithClose } from '@/utils/toast.tsx';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filedError, setFiledError] = useState<ErrorDetail[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError('');
    if (filedError.length > 0) setFiledError([]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFiledError([]);
    setLoading(true);

    try {
      const response = await authService.register(formData);

      if (response.success) {
        successWithClose(
          'Chúc mừng bạn đã đăng ký thành công, kiểm tra email để verify sẽ chuyển đến trang đăng nhập sau 5s',
          () => navigate(AUTH_PATHS.LOGIN),
          5000
        );
      } else {
        setFiledError(response.errors);
      }
    } catch (err: any) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setFiledError(err.response.data.errors);
      } else {
        const errorMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden font-sans">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-slate-900 to-black opacity-80"></div>

        <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-700"></div>
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-info rounded-full mix-blend-multiply filter blur-[96px] opacity-30"></div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>

      <div className="relative w-full max-w-[500px] z-10">
        <div className="text-center mb-8 transform transition-all hover:scale-105 duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-primary to-info rounded-2xl shadow-lg shadow-primary/30 mb-4 border border-white/20">
            <GitBranch className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 mb-2 tracking-tight">
            EduTools
          </h1>
          <p className="text-blue-200/80 text-small font-medium tracking-wide uppercase">
            FPT University Management System
          </p>
        </div>

        <div className="card-academic backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-academic-h2 text-text-primary">
              Chào mừng đến với Edutools ! <WavingHandIcon className="bg-blend-color mb-1" />
            </h2>
            <p className="text-text-secondary text-small mt-1">
              Nhập thông tin đăng ký của bạn để có thể tiếp tục sử dụng.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/80 border border-red-300 text-error px-4 py-3 rounded-xl flex items-start gap-3 text-small animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="group">
              <label className="block text-small font-semibold text-text-primary mb-1.5 ml-1">
                Họ và tên
              </label>
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <BadgeCheck size={20} className="text-primary flex-shrink-0" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <ErrorField errors={filedError} field="fullName" />
            </div>

            <div className="group">
              <label className="block text-small font-semibold text-text-primary mb-1.5 ml-1">
                Email
              </label>
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <ErrorField errors={filedError} field="email" />
            </div>

            <div className="group">
              <label className="block text-small font-semibold text-text-primary mb-1.5 ml-1">
                Tên đăng nhập
              </label>
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <User size={20} className="text-primary flex-shrink-0" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
                  placeholder="username123"
                  required
                />
              </div>
              <ErrorField errors={filedError} field="username" />
            </div>

            <div className="group">
              <label className="block text-small font-semibold text-text-primary mb-1.5 ml-1">
                Mật khẩu
              </label>
              <div className="w-full px-4 py-3 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all flex items-center gap-3">
                <Lock size={20} className="text-primary flex-shrink-0" />
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-9 bg-transparent border-none outline-none text-text-primary placeholder:text-secondary font-medium"
                    placeholder="Tối thiểu 8 ký tự"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-lg transition-all duration-200 flex items-center justify-center text-primary hover:bg-border/50 p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <p className="text-caption text-secondary mt-1 ml-1">
                * Mật khẩu cần ít nhất 8 ký tự gồm 1 ký tự đặc biệt và 1 ký tự in hoa
              </p>
              <ErrorField errors={filedError} field="password" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 group relative bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary-active text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Đang tạo tài khoản...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Đăng ký ngay</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-small text-text-secondary">
              Đã có tài khoản?{' '}
              <button
                onClick={() => navigate(AUTH_PATHS.LOGIN)}
                className="text-primary hover:text-primary-hover font-bold hover:underline transition-all"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
