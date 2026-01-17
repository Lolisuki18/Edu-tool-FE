const HowItWork = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">EduTools hoạt động như thế nào?</h2>

      <div className="mt-12 grid gap-8 md:grid-cols-4">
        {[
          'Đăng nhập & tạo nhóm',
          'Phân công công việc',
          'Theo dõi tiến độ',
          'Đánh giá & báo cáo',
        ].map((step, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              {i + 1}
            </div>
            <p className="font-medium">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowItWork;
