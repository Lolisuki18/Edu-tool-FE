import type { SystemRole } from './role.types';

//========== Request Type ==========
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

//========== Response Type ==========

export interface RegisterResponse {
  isSuccess: true;
}

export interface AuthResponse {
  accessToken: string;
}

export interface JwtPayload {
  sub: string;
  role: SystemRole;
  iat: number;
  exp: number;
}

// Error response
export interface ApiError {
  error: string;
  message: string;
  status: 500;
}
