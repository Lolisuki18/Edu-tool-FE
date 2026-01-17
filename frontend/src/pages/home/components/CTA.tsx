import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="bg-indigo-600 py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold">Sẵn sàng quản lý học tập hiệu quả hơn?</h2>
        <p className="mt-4 text-indigo-100">Bắt đầu sử dụng EduTools ngay hôm nay</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 hover:bg-gray-100"
          >
            Đăng ký miễn phí
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-white/40 px-8 py-3 font-semibold hover:bg-white/10"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
