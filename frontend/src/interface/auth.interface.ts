import type { SystemRole } from '../types/role.types';
import type { UserStatus } from '../types/user.type';

//========== Request Type ==========
export interface LoginRequest {
  username: string;
  password: string;
  withCredentials: boolean;
}
export interface RegisterRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

//========== Response Type ==========

export interface AuthResponse {
  role: SystemRole;
  fullName: string;
  email: string;
  status: UserStatus;
  accessToken: string;
}

export interface JwtPayload {
  sub: string;
  role: SystemRole;
  iat: number;
  exp: number;
}
