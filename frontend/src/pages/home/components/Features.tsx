import { ChartBarIcon, ClipboardIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">Tính năng nổi bật</h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {[
          {
            title: 'Quản lý nhóm & vai trò',
            desc: 'Phân quyền Leader, Member, Giảng viên rõ ràng.',
            icon: <UsersIcon className="h-8 w-8 text-indigo-600" />,
          },
          {
            title: 'Theo dõi Task & tiến độ',
            desc: 'Giao việc, cập nhật trạng thái, deadline rõ ràng.',
            icon: <ClipboardIcon className="h-8 w-8 text-indigo-600" />,
          },
          {
            title: 'Dashboard trực quan',
            desc: 'Theo dõi tiến độ học tập và hiệu suất nhóm.',
            icon: <ChartBarIcon className="h-8 w-8 text-indigo-600" />,
          },
          {
            title: 'Phân quyền hệ thống',
            desc: 'Admin quản lý toàn bộ người dùng & dữ liệu.',
            icon: <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />,
          },
        ].map((f, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex items-center gap-3">
              {f.icon}
              <h3 className="text-xl font-semibold">{f.title}</h3>
            </div>

            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Features;
