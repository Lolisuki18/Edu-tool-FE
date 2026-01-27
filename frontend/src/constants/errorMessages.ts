// Error message mapping từ API sang tiếng Việt
export const ERROR_MESSAGES: Record<string, string> = {
  // Password errors
  Pattern: 'Mật khẩu cần ít nhất 8 ký tự gồm 1 ký tự đặc biệt, 1 ký tự in hoa và 1 số',

  // Email errors
  'Invalid email format': 'Định dạng email không hợp lệ',
  'Email already exists': 'Email này đã được sử dụng',

  // Username errors
  'Username already exists': 'Tên đăng nhập này đã được sử dụng',
  'Username must be at least 3 characters': 'Tên đăng nhập phải có ít nhất 3 ký tự',

  // Full name errors
  'Full name is required': 'Họ và tên là bắt buộc',
  'Full name must be at least 2 characters': 'Họ và tên phải có ít nhất 2 ký tự',

  // Generic errors
  Required: 'Trường này là bắt buộc',
  'Invalid request data': 'Dữ liệu không hợp lệ',
  'Internal server error': 'Lỗi hệ thống máy chủ',

  'Password must be between 8 and 100 characters': 'Mật khẩu cần có từ 8 đến 100 kí tự',
  'Invalid username or password': 'Nhập sai username hoặc mật khẩu',
  // Make new error
  // 'New Error Message From API': 'Thông báo lỗi tiếng Việt',
  // 'ErrorCode': 'Thông báo lỗi theo code',
};

// Fallback messages for common English error patterns
export const ERROR_PATTERN_MAPPING: Array<{ pattern: RegExp; message: string }> = [
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

  //Make new pattern
  // {
  //   pattern: /your.*regex.*pattern/i,
  //   message: 'Thông báo tiếng Việt cho pattern này',
  // },
];
