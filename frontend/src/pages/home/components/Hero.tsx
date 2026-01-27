import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-info text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">EduTools</h1>
        <p className="mt-6 text-lg text-blue-100 md:text-xl">
          Nền tảng quản lý học tập & project dành cho sinh viên và giảng viên
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/register" className="btn-primary shadow hover:shadow-lg">
            Bắt đầu ngay
          </Link>
          <Link
            to="/login"
            className="btn-secondary bg-white/10 text-white border-white/40 hover:bg-white/20"
          >
            Xem demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
