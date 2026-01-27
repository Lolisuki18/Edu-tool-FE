import { UsersIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

const UserRole = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-academic-h2">Ai nên sử dụng EduTools?</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Sinh viên',
              desc: 'Quản lý nhóm, task, deadline và đóng góp cá nhân.',
              icon: <UsersIcon className="h-8 w-8 text-primary" />,
            },
            {
              title: 'Giảng viên',
              desc: 'Theo dõi tiến độ, đánh giá và quản lý lớp học.',
              icon: <UsersIcon className="h-8 w-8 text-primary" />,
            },
            {
              title: 'Quản trị viên',
              desc: 'Quản lý hệ thống, người dùng và phân quyền.',
              icon: <WrenchScrewdriverIcon className="h-8 w-8 text-primary" />,
            },
          ].map((r, i) => (
            <div key={i} className="card-academic text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl">{r.icon}</span>
                <h3 className="text-academic-h3">{r.title}</h3>
              </div>
              <p className="mt-2 text-academic-body text-text-secondary">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UserRole;
