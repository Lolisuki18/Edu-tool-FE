import { useState, type FormEvent } from 'react';
import {
  GitBranch,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  ArrowRight,
  User as UserIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import WavingHandIcon from '@mui/icons-material/WavingHand';

import authService from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import { SYSTEM_ROLE } from '@/types/role.types';
import { AUTH_PATHS } from '@/constants/auth/auth.path';
import type { User } from '@/types/user.type';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ username, password, withCredentials: true });
      console.log(response);
      if (response.data.accessToken) {
        const user = response.data as User;
        console.log(user);
        login(user);

        if (user.role?.toUpperCase() === SYSTEM_ROLE.ADMIN) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden font-sans">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-80"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[60%] w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[96px] opacity-40"></div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>
      <div className="relative w-full max-w-[450px] z-10">
        <div className="text-center mb-8 transform transition-all hover:scale-105 duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl shadow-lg shadow-blue-500/30 mb-4 border border-white/20">
            <GitBranch className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 mb-2 tracking-tight">
            EduTools
          </h1>
          <p className="text-blue-200/80 text-sm font-medium tracking-wide uppercase">
            FPT University Management System
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Chào mừng trở lại! <WavingHandIcon className="bg-blend-color mb-1" />
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Nhập thông tin đăng nhập của bạn để tiếp tục.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/80 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <UserIcon size={20} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-800 placeholder:text-slate-400 font-medium"
                    placeholder="Nhập tên đăng nhập"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-1.5 ml-1">
                  <label className="block text-sm font-semibold text-slate-700">Mật khẩu</label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-800 placeholder:text-slate-400 font-medium"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-all"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center ml-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer w-5 h-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 checked:border-blue-600 checked:bg-blue-600 transition-all"
                  />
                  <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2.5 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Đăng nhập</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative px-4 bg-white text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Hoặc tiếp tục với
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group"
              >
                <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-600">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
              >
                <FaGithub className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-600">Github</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Chưa có tài khoản?{' '}
              <button
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
                onClick={() => navigate(AUTH_PATHS.REGISTER)}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
