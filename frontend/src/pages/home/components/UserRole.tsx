import { UsersIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

const UserRole = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold">Ai nên sử dụng EduTools?</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Sinh viên',
              desc: 'Quản lý nhóm, task, deadline và đóng góp cá nhân.',
              icon: <UsersIcon className="h-8 w-8 text-indigo-600" />,
            },
            {
              title: 'Giảng viên',
              desc: 'Theo dõi tiến độ, đánh giá và quản lý lớp học.',
              icon: <UsersIcon className="h-8 w-8 text-indigo-600" />,
            },
            {
              title: 'Quản trị viên',
              desc: 'Quản lý hệ thống, người dùng và phân quyền.',
              icon: <WrenchScrewdriverIcon className="h-8 w-8 text-indigo-600" />,
            },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl">{r.icon}</span>
                <h3 className="text-xl font-semibold">{r.title}</h3>
              </div>
              <p className="mt-2 text-gray-600">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UserRole;
