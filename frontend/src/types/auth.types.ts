import type { SystemRole } from './role.types';

//========== Request Type ==========
export interface LoginRequest {
  username: string;
  password: string;
}

//========== Response Type ==========

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
