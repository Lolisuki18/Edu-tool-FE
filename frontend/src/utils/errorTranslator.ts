import { ERROR_MESSAGES, ERROR_PATTERN_MAPPING } from '@/constants/errorMessages';
import type { ErrorDetail } from '@/types/interface/api.interface';

/**
 * Translate error message từ tiếng Anh sang tiếng Việt
 * @param message - Error message từ API
 * @param code - Error code từ API (optional)
 * @returns Translated message hoặc original message nếu không tìm thấy translation
 */
export const translateErrorMessage = (message: string, code?: string): string => {
  if (code && ERROR_MESSAGES[code]) {
    return ERROR_MESSAGES[code];
  }

  if (ERROR_MESSAGES[message]) {
    return ERROR_MESSAGES[message];
  }

  // Mapping theo pattern
  for (const { pattern, message: translatedMessage } of ERROR_PATTERN_MAPPING) {
    if (pattern.test(message)) {
      return translatedMessage;
    }
  }

  return message;
};

/**
 * Translate mảng ErrorDetail
 * @param errors - Mảng errors từ API
 * @returns Mảng errors đã được translate
 */
export const translateErrors = (errors: ErrorDetail[]): ErrorDetail[] => {
  return errors.map(error => ({
    ...error,
    message: translateErrorMessage(error.message, error.code),
  }));
};

/**
 * Get translated error message cho một field cụ thể
 * @param errors - Mảng errors từ API
 * @param fieldName - Tên field cần lấy error
 * @returns Translated error message hoặc null nếu không có lỗi
 */
export const getFieldError = (errors: ErrorDetail[], fieldName: string): string | null => {
  const fieldError = errors.find(error => error.field === fieldName);
  if (!fieldError) return null;

  return translateErrorMessage(fieldError.message, fieldError.code);
};
