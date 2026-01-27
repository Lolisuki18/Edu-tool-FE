import type { SystemRole } from '../role.types';
import type { UserStatus } from '../user.type';

export interface Users {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: SystemRole;
  status: UserStatus;
}
