import { ERROR_MESSAGES, ERROR_PATTERN_MAPPING } from '@/constants/errorMessages';
import type { ErrorDetail } from '@/interface/api.interface';

export const translateErrorMessage = (message: string, code?: string): string => {
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  if (ERROR_MESSAGES[message]) return ERROR_MESSAGES[message];
  const linePrefixMatch = message.match(/^(Line \d+: )(.+)$/);

  if (linePrefixMatch) {
    const prefix = linePrefixMatch[1].replace('Line', 'Dòng');
    const coreMessage = linePrefixMatch[2];

    for (const { pattern, message: translatedMessage } of ERROR_PATTERN_MAPPING) {
      if (pattern.test(coreMessage)) {
        const translatedCore = coreMessage.replace(pattern, translatedMessage);
        return `${prefix}${translatedCore}`;
      }
    }
    return `${prefix}${coreMessage}`;
  }

  for (const { pattern, message: translatedMessage } of ERROR_PATTERN_MAPPING) {
    if (pattern.test(message)) {
      return message.replace(pattern, translatedMessage);
    }
  }

  return message;
};

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
