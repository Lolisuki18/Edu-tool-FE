import type { SystemRole } from '../types/role.types';
import type { UserStatus } from '../types/user.type';

export interface Users {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: SystemRole;
  status: UserStatus;
}

export interface UserFormState {
  id?: number;
  fullName: string;
  email: string;
  role: string;
  password?: string;
  status: string;
  username: string;
}
