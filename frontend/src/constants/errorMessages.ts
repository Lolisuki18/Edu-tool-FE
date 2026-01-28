// Error message mapping cho các chuỗi khớp hoàn toàn
export const ERROR_MESSAGES: Record<string, string> = {
  Pattern: 'Mật khẩu cần ít nhất 8 ký tự gồm 1 ký tự đặc biệt, 1 ký tự in hoa và 1 số',
  'Invalid email format': 'Định dạng email không hợp lệ',
  'Email already exists': 'Email này đã được sử dụng',
  'Username already exists': 'Tên đăng nhập này đã được sử dụng',
  'Username must be at least 3 characters': 'Tên đăng nhập phải có ít nhất 3 ký tự',
  'Full name is required': 'Họ và tên là bắt buộc',
  'Full name must be at least 2 characters': 'Họ và tên phải có ít nhất 2 ký tự',
  Required: 'Trường này là bắt buộc',
  'Invalid request data': 'Dữ liệu không hợp lệ',
  'Internal server error': 'Lỗi hệ thống máy chủ',
  'Password must be between 8 and 100 characters': 'Mật khẩu cần có từ 8 đến 100 kí tự',
  'Invalid username or password': 'Nhập sai username hoặc mật khẩu',
};

// MAPPING THEO PATTERN (Sử dụng Regex)
export const ERROR_PATTERN_MAPPING: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /Email already exists: (.*)/i,
    message: 'Email này đã tồn tại trong hệ thống: $1',
  },
  {
    pattern: /Username already exists: (.*)/i,
    message: 'Tên đăng nhập đã tồn tại: $1',
  },
  {
    pattern: /No enum constant.*Role\.(.*)/i,
    message: 'Giá trị Vai trò không hợp lệ: $1 (Yêu cầu: ADMIN, LECTURER hoặc STUDENT)',
  },
  {
    pattern: /No enum constant.*Status\.(.*)/i,
    message: 'Trạng thái không hợp lệ: $1',
  },

  {
    pattern: /password.*contain.*uppercase.*lowercase.*number/i,
    message: 'Mật khẩu cần ít nhất 8 ký tự gồm 1 ký tự đặc biệt, 1 ký tự in hoa và 1 số',
  },
  {
    pattern: /email.*invalid|invalid.*email/i,
    message: 'Định dạng email không hợp lệ',
  },
  {
    pattern: /username.*already.*exist|exist.*username/i,
    message: 'Tên đăng nhập này đã được sử dụng',
  },
  {
    pattern: /email.*already.*exist|exist.*email/i,
    message: 'Email này đã được sử dụng',
  },
];
