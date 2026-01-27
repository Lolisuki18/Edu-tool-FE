import { SYSTEM_ROLE } from '@/types/role.types';
import { USER_STATUS } from '@/types/user.type';

export const translateRole = (role: string) => {
  if (role == SYSTEM_ROLE.ADMIN) {
    return 'Quản trị viên';
  }
  if (role == SYSTEM_ROLE.LECTURER) {
    return 'Giảng viên';
  }
  if (role == SYSTEM_ROLE.STUDENT) {
    return 'Sinh viên';
  }
  return 'Không xác định';
};

export const translateStatus = (status: string) => {
  if (status == USER_STATUS.ACTIVE) {
    return 'Hoạt động';
  }
  if (status == USER_STATUS.INACTIVE) {
    return 'Không hoạt động';
  }
  if (status == USER_STATUS.VERIFICATION_PENDING) {
    return 'Đang xác thực';
  }
  return 'Không xác định';
};
