const HowItWork = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-academic-h2">EduTools hoạt động như thế nào?</h2>

      <div className="mt-12 grid gap-8 md:grid-cols-4">
        {[
          'Đăng nhập & tạo nhóm',
          'Phân công công việc',
          'Theo dõi tiến độ',
          'Đánh giá & báo cáo',
        ].map((step, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
              {i + 1}
            </div>
            <p className="text-academic-body font-medium text-text-primary">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowItWork;
