import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold">Sẵn sàng quản lý học tập hiệu quả hơn?</h2>
        <p className="mt-4 text-blue-100">Bắt đầu sử dụng EduTools ngay hôm nay</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register" className="btn-primary bg-white text-primary hover:bg-background">
            Đăng ký miễn phí
          </Link>
          <Link
            to="/login"
            className="btn-secondary bg-white/10 text-white border-white/40 hover:bg-white/20"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
