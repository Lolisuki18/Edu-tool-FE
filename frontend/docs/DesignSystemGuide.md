# 🎓 EduTool Design System – Color & Typography Guide (Academic Style)

Tài liệu này định nghĩa **chuẩn màu sắc và font chữ chính thức cho EduTool**, một ứng dụng theo **định hướng học thuật – giáo dục – quản trị đào tạo**.

Mục tiêu:

- Đảm bảo **tính học thuật, nghiêm túc và đáng tin cậy**
- Tối ưu **khả năng đọc nội dung dài** (bài giảng, tài liệu, dashboard)
- Giữ UI **đơn giản, không gây nhiễu nhận thức**

---

## 1. Triết lý thiết kế (Design Philosophy)

EduTool tuân theo các nguyên tắc:

- **Academic First**: ưu tiên nội dung hơn hiệu ứng
- **Clarity over Decoration**: rõ ràng > màu mè
- **Consistency**: nhất quán giữa Student / Lecturer / Admin
- **Low Cognitive Load**: giảm mệt mỏi khi học lâu

---

## 2. Hệ thống màu sắc (Academic Color System)

### 2.1. Primary Color – Academic Blue

| Thuộc tính | Giá trị   |
| ---------- | --------- |
| Primary    | `#1E40AF` |
| Hover      | `#1E3A8A` |
| Active     | `#172554` |

**Ý nghĩa:**

- Tri thức
- Tin cậy
- Học thuật
- Hệ thống giáo dục

**Sử dụng:**

- Primary Button
- Link chính
- Active menu
- Icon trạng thái chính

---

### 2.2. Secondary Color – Neutral Slate

| Thuộc tính | Giá trị   |
| ---------- | --------- |
| Secondary  | `#475569` |
| Hover      | `#334155` |

**Sử dụng:**

- Button phụ
- Text phụ
- Label
- Divider

---

### 2.3. Semantic Colors (Màu ngữ nghĩa)

| Trạng thái | Màu   | Hex       | Nguyên tắc         |
| ---------- | ----- | --------- | ------------------ |
| Success    | Green | `#15803D` | Hoàn thành, đạt    |
| Info       | Blue  | `#0369A1` | Thông báo học vụ   |
| Warning    | Amber | `#B45309` | Nhắc nhở, deadline |
| Error      | Red   | `#B91C1C` | Lỗi hệ thống       |

⚠️ **Lưu ý học thuật:**

- Không dùng màu Error để tạo áp lực thị giác
- Warning chỉ dùng cho deadline / cảnh báo nhẹ

---

### 2.4. Neutral Color Palette

| Mục đích       | Màu       |
| -------------- | --------- |
| App Background | `#F8FAFC` |
| Card / Panel   | `#FFFFFF` |
| Border         | `#E2E8F0` |
| Text chính     | `#0F172A` |
| Text phụ       | `#475569` |
| Disabled       | `#CBD5E1` |

---

## 3. Typography (Font & Chữ viết)

### 3.1. Font chính

**Font:** `Inter`

```css
font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Lý do:**

- Dễ đọc với văn bản dài
- Trung tính, học thuật
- Hiển thị tốt trên màn hình
- Hỗ trợ tiếng Việt

---

### 3.2. Font Weight (Academic-friendly)

| Weight | Sử dụng               |
| ------ | --------------------- |
| 400    | Nội dung bài học      |
| 500    | Label, form, metadata |
| 600    | Heading, button       |

⚠️ Không dùng weight 700 cho toàn bộ heading để tránh cảm giác marketing.

---

### 3.3. Font Size

| Loại    | Size | Line-height |
| ------- | ---- | ----------- |
| H1      | 30px | 40px        |
| H2      | 24px | 34px        |
| H3      | 20px | 30px        |
| Body    | 16px | 26px        |
| Small   | 14px | 22px        |
| Caption | 12px | 18px        |

---

## 4. Quy chuẩn theo vai trò (Role-based UI)

### 4.1. Student View

- Màu sắc nhẹ
- Ít warning
- Ưu tiên content học tập

### 4.2. Lecturer View

- Nhấn mạnh Info / Success
- Rõ trạng thái bài tập, điểm số

### 4.3. Admin View

- Rõ ràng
- Nhiều bảng, ít màu
- Error chỉ dùng cho hệ thống

---

## 5. Button Guidelines

| Loại      | Background   | Text      |
| --------- | ------------ | --------- |
| Primary   | Primary Blue | White     |
| Secondary | White        | Primary   |
| Danger    | Error        | White     |
| Disabled  | `#CBD5E1`    | `#64748B` |

- Button tối thiểu height: **40px**
- Không dùng gradient

---

## 6. Accessibility & Readability

- Contrast ratio ≥ **4.5:1**
- Không truyền tải thông tin chỉ bằng màu
- Text tối thiểu: **14px**
- Khoảng cách dòng rộng để đọc lâu

---

## 7. Ví dụ cấu hình

```ts
// Tailwind colors for EduTool
colors: {
  primary: '#1E40AF',
  secondary: '#475569',
  success: '#15803D',
  info: '#0369A1',
  warning: '#B45309',
  error: '#B91C1C'
}
```

---

## 8. Kết luận

Design System này là **chuẩn bắt buộc** cho toàn bộ EduTool.

Mục tiêu không phải là đẹp nổi bật, mà là:

> **Dễ học – Dễ đọc – Dễ quản lý – Dễ mở rộng**

---

📌 _EduTool Design System – Academic Edition_
📌 _Version: 1.1_
📌 _Last updated: 2026_
