import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Error 404</p>

          <h1 className="mt-2 text-5xl font-extrabold text-slate-900 leading-tight">
            Không tìm thấy trang
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Trang bạn đang tìm kiếm không tồn tại, đã bị xoá hoặc thay đổi đường dẫn.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              <HomeIcon className="h-5 w-5" />
              Về trang chủ
            </button>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-100 transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Quay lại
            </button>
          </div>
        </div>

        {/* Right illustration */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="text-[180px] font-extrabold text-slate-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-slate-500">Oops!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
