import type { SystemRole } from './role.types';

export type User = {
  role?: SystemRole;
  fullName: string;
  email: string;
  status: UserStatus;
  accessToken: string;
};

// STATUS
export const USER_STATUS = {
  VERIFICATION_PENDING: 'VERIFICATION_PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
