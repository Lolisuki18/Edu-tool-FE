# 🎨 EduTool Design System - Developer Guide

## 📖 Tổng quan

Design System này được xây dựng với **Tailwind CSS v4** theo phong cách **học thuật (Academic)**, tối ưu cho ứng dụng giáo dục.

**Ưu điểm:**

- ✅ Chỉ cần đổi **1 nơi** (CSS variables trong `index.css`)
- ✅ Tự động apply trên toàn bộ dự án
- ✅ Hỗ trợ cả Tailwind classes và JavaScript constants
- ✅ Type-safe với TypeScript
- ✅ Dễ mở rộng và maintain

---

## 🎯 Cách sử dụng

### 1️⃣ Tailwind Classes (Khuyến nghị cho HTML/JSX)

```tsx
// ✅ ĐÚNG - Sử dụng semantic classes
<div className="bg-primary text-white">
  <h1 className="text-academic-h1">Tiêu đề</h1>
  <button className="btn-primary">Xác nhận</button>
  <input className="input-academic" />
</div>

// ❌ SAI - Hardcode colors (khó maintain)
<div className="bg-[#1E40AF] text-white">
  <h1 style={{ color: '#1E40AF', fontSize: '30px' }}>Tiêu đề</h1>
</div>
```

### 2️⃣ CSS Variables (Cho inline styles)

```tsx
import { CSS_VARS } from '@/theme';

<div
  style={{
    backgroundColor: CSS_VARS.primary,
    color: CSS_VARS.textPrimary,
  }}
>
  Content
</div>;
```

### 3️⃣ JavaScript Constants (Cho logic/conditional styling)

```tsx
import { COLORS, TYPOGRAPHY } from '@/theme';

const buttonColor = isCreate ? COLORS.primary : COLORS.success;

<button style={{ backgroundColor: buttonColor }}>Click me</button>;
```

---

## 🎨 Color Palette

### Tailwind Classes

| Class                             | Hex     | Mô tả          |
| --------------------------------- | ------- | -------------- |
| `bg-primary` / `text-primary`     | #1E40AF | Academic Blue  |
| `bg-secondary` / `text-secondary` | #475569 | Neutral Slate  |
| `bg-success` / `text-success`     | #15803D | Success Green  |
| `bg-info` / `text-info`           | #0369A1 | Info Blue      |
| `bg-warning` / `text-warning`     | #B45309 | Warning Amber  |
| `bg-error` / `text-error`         | #B91C1C | Error Red      |
| `bg-background`                   | #F8FAFC | App Background |
| `bg-card`                         | #FFFFFF | Card/Panel     |
| `border-border`                   | #E2E8F0 | Borders        |

**Ví dụ:**

```tsx
<div className="bg-primary text-white p-4">Primary Block</div>
<div className="bg-background border border-border">Container</div>
<p className="text-error">Lỗi xảy ra!</p>
```

---

## ✍️ Typography

### Classes định nghĩa sẵn

| Class                | Font Size | Line Height | Font Weight |
| -------------------- | --------- | ----------- | ----------- |
| `text-academic-h1`   | 30px      | 40px        | 600         |
| `text-academic-h2`   | 24px      | 34px        | 600         |
| `text-academic-h3`   | 20px      | 30px        | 600         |
| `text-academic-body` | 16px      | 26px        | 400         |

### Tailwind utility sizes

| Class          | Size | Line Height |
| -------------- | ---- | ----------- |
| `text-h1`      | 30px | 40px        |
| `text-h2`      | 24px | 34px        |
| `text-body`    | 16px | 26px        |
| `text-small`   | 14px | 22px        |
| `text-caption` | 12px | 18px        |

**Ví dụ:**

```tsx
<h1 className="text-academic-h1">Tiêu đề chính</h1>
<p className="text-academic-body text-text-primary">Nội dung bài học...</p>
<span className="text-caption text-secondary">Metadata</span>
```

---

## 🔘 Button Components

### Classes định nghĩa sẵn

```tsx
// Primary Button (Academic Blue)
<button className="btn-primary">
  Xác nhận
</button>

// Secondary Button (Outlined)
<button className="btn-secondary">
  Hủy bỏ
</button>

// Success Button (Green)
<button className="btn-success">
  Hoàn thành
</button>
```

### Custom Button với COLORS

```tsx
import { COLORS } from '@/theme';

<button
  className="px-6 py-3 rounded-xl text-white font-semibold"
  style={{ backgroundColor: COLORS.warning }}
>
  Cảnh báo
</button>;
```

---

## 📝 Input Components

### Input Academic Style

```tsx
<input
  className="input-academic"
  placeholder="Nhập thông tin..."
/>

// With icon
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
    <Icon />
  </div>
  <input className="input-academic pl-11" />
</div>
```

---

## 📦 Card/Panel Components

```tsx
<div className="card-academic">
  <h3 className="text-academic-h3">Card Title</h3>
  <p className="text-academic-body">Card content...</p>
</div>
```

---

## 🔄 Cách thay đổi Design System

### Thay đổi màu primary trong toàn bộ dự án

Mở **`src/index.css`** và sửa:

```css
@theme {
  --color-primary: #1e40af; /* Đổi thành màu mới */
  --color-primary-hover: #1e3a8a;
  --color-primary-active: #172554;
}
```

**Tất cả component sử dụng `bg-primary`, `text-primary`, `btn-primary` sẽ tự động cập nhật!**

### Thay đổi Typography

```css
@theme {
  --font-size-h1: 32px; /* Tăng từ 30px */
  --line-height-h1: 42px;
}
```

### Thêm màu mới

```css
@theme {
  --color-brand-new: #ff6b6b;
}
```

Sau đó thêm vào `theme/colors.ts`:

```ts
export const COLORS = {
  // ...existing
  brandNew: '#FF6B6B',
};
```

Giờ có thể dùng: `<div className="bg-brand-new">`

---

## 🎓 Best Practices

### ✅ DO (Nên làm)

```tsx
// 1. Dùng semantic classes
<button className="btn-primary">Submit</button>;

// 2. Dùng theme constants cho logic
const bgColor = isActive ? COLORS.primary : COLORS.secondary;

// 3. Dùng custom utilities
<div className="card-academic">...</div>;
```

### ❌ DON'T (Không nên)

```tsx
// 1. Hardcode hex colors
<div className="bg-[#1E40AF]">...</div>

// 2. Inline styles không cần thiết
<h1 style={{ fontSize: '30px', color: '#1E40AF' }}>Title</h1>

// 3. Magic numbers
<div style={{ padding: '24px' }}>...</div>
```

---

## 📂 File Structure

```
src/
├── index.css              # Tailwind v4 @theme config + utilities
├── theme/
│   ├── index.ts           # Main export
│   ├── colors.ts          # Color constants
│   └── typography.ts      # Typography constants
└── components/
    └── user/
        └── UserModal.tsx  # ✅ Example sử dụng Design System
```

---

## 🚀 Migration Checklist

Để migrate component cũ sang Design System:

- [ ] Thay `bg-[#1E40AF]` → `bg-primary`
- [ ] Thay `text-[#0F172A]` → `text-text-primary`
- [ ] Thay inline fontSize/lineHeight → `text-academic-h1`
- [ ] Thay button styles → `btn-primary`
- [ ] Thay input styles → `input-academic`
- [ ] Import `{ COLORS }` nếu cần logic styling
- [ ] Remove hardcoded hex colors

---

## 🔗 Related Files

- [Design Guide](./DesignSystemGuide.md) - Chi tiết triết lý design
- [index.css](../src/index.css) - Tailwind v4 configuration
- [theme/index.ts](../src/theme/index.ts) - Theme constants
- [UserModal.tsx](../src/components/user/UserModal.tsx) - Example implementation

---

## 💡 Examples

### Complete Form Example

```tsx
import { COLORS } from '@/theme';

function LoginForm() {
  return (
    <div className="card-academic">
      <h2 className="text-academic-h2">Đăng nhập</h2>

      <div className="space-y-4">
        <input type="email" className="input-academic" placeholder="Email" />

        <input type="password" className="input-academic" placeholder="Mật khẩu" />

        <button className="btn-primary w-full">Đăng nhập</button>
      </div>
    </div>
  );
}
```

### Alert Components

```tsx
// Success Alert
<div className="p-4 bg-green-50 border border-green-300 rounded-xl flex items-center gap-3">
  <div className="w-1 h-6 bg-success rounded-full"></div>
  <p className="text-small text-success">Thành công!</p>
</div>

// Error Alert
<div className="p-4 bg-red-50 border border-red-300 rounded-xl flex items-center gap-3">
  <div className="w-1 h-6 bg-error rounded-full"></div>
  <p className="text-small text-error">Có lỗi xảy ra!</p>
</div>
```

---

## 🎯 Summary

- **Tập trung hóa:** Tất cả colors/typography ở `index.css`
- **Đơn giản hóa:** Chỉ cần đổi 1 nơi, tự động apply toàn dự án
- **Type-safe:** TypeScript constants cho JavaScript logic
- **Scalable:** Dễ thêm màu mới, typography mới
- **Academic-focused:** Thiết kế cho giáo dục, dễ đọc, nghiêm túc

---

**✨ Happy Coding with EduTool Design System!**
