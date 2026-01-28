# Edu-Tool Frontend

Ứng dụng frontend cho hệ thống Edu-Tool được xây dựng với React, TypeScript, Vite và Tailwind CSS v4.1.

## 🛠️ Công nghệ sử dụng

- **React 19** - Thư viện UI
- **TypeScript** - Ngôn ngữ lập trình
- **Vite** - Build tool và dev server
- **Tailwind CSS v4.1** - Framework CSS
- **ESLint** - Linting
- **Prettier** - Code formatting

## 📋 Yêu cầu hệ thống

- Node.js >= 18.x
- npm >= 9.x hoặc yarn >= 1.22.x

## 🚀 Cài đặt

1. Clone repository và di chuyển vào thư mục frontend:

```bash
cd frontend
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

4. Cấu hình các biến môi trường trong file `.env` theo nhu cầu của bạn.
   **Lưu ý:** Nếu muốn thiết kế thêm, hãy tuân thủ những nguyên tắc Design System (xem tài liệu trong thư mục `frontend/docs`).

## 💻 Cách chạy ứng dụng

### Chế độ Development

Chạy development server với hot-reload:

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Build Production

Build ứng dụng cho môi trường production:

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`

### Preview Build

Xem trước bản build production trên local:

```bash
npm run preview
```

## 🎨 Code Formatting

### Format code tự động

Format tất cả các file trong dự án:

```bash
npm run format
```

### Kiểm tra format

Kiểm tra xem code có đúng format chưa (không thay đổi file):

```bash
npm run format:check
```

### Linting

Kiểm tra code với ESLint:

```bash
npm run lint
```

## 📁 Cấu trúc thư mục

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components (admin, common, confirm, navigation, user,...)
│   ├── config/         # Cấu hình (axios, ...)
│   ├── constants/      # Các hằng số dùng chung
│   ├── context/        # React context
│   ├── data/           # Dữ liệu tĩnh cho UI (header, nav, sidebar, user)
│   ├── hooks/          # Custom hooks
│   ├── interface/      # Định nghĩa interface TypeScript
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components (admin, auth, home, NotFound)
│   ├── routes/         # Định nghĩa route
│   ├── services/       # Gọi API, xử lý nghiệp vụ
│   ├── stores/         # State management (nếu có)
│   ├── styles/         # File CSS dùng chung
│   ├── theme/          # Cấu hình theme (colors, typography, ...)
│   ├── types/          # Định nghĩa types TypeScript
│   ├── utils/          # Hàm tiện ích
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles + Tailwind imports
├── .env                # Environment variables (local)
├── .env.example        # Environment variables template
├── .prettierrc         # Prettier configuration
├── .prettierignore     # Prettier ignore rules
├── eslint.config.js    # ESLint configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 📝 Scripts có sẵn

| Script                 | Mô tả                         |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Chạy development server       |
| `npm run build`        | Build ứng dụng cho production |
| `npm run preview`      | Preview bản build production  |
| `npm run lint`         | Chạy ESLint để kiểm tra code  |
| `npm run format`       | Format code với Prettier      |
| `npm run format:check` | Kiểm tra format code          |

## 🔧 Cấu hình

### Tailwind CSS

Tailwind CSS v4.1 đã được cấu hình sẵn. Import được thêm trong `src/index.css`:

```css
@import "tailwindcss";
```

### Environment Variables

Các biến môi trường cần thiết được định nghĩa trong file `.env`:

- `VITE_API_URL` - URL của API backend
- `VITE_API_TIMEOUT` - Timeout cho API requests
- `VITE_APP_NAME` - Tên ứng dụng
- `VITE_APP_VERSION` - Phiên bản ứng dụng

## 👨‍💻 Hướng dẫn phát triển

1. **Tạo component mới**: Đặt trong thư mục `src/components/`
2. **Sử dụng Tailwind CSS**: Sử dụng utility classes trực tiếp trong JSX
3. **Format code**: Luôn chạy `npm run format` trước khi commit
4. **Kiểm tra lỗi**: Chạy `npm run lint` để đảm bảo code không có lỗi

## 📦 Build và Deploy

Sau khi build thành công với `npm run build`, thư mục `dist/` có thể được deploy lên:

- Vercel
- Netlify
- GitHub Pages
- Hoặc bất kỳ static hosting nào

---

Made with ❤️ by Lolisuki18
