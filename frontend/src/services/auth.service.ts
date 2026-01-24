import axiosInstance from '@/config/axios.config';
import type { ApiResponse } from '@/types/interface/api.interface';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/interface/auth.interface';

class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
        '/auth/login',
        credentials
      );
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>('/auth/register', userData);
    console.log(response);
    return response;
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('edu_token');
      localStorage.removeItem('edu_user');
    }
  }

  /**
   * Lấy thông tin user hiện tại
   */
  //   async getCurrentUser(): Promise<AuthResponse> {
  //     try {
  //       const response = await axiosInstance.get<never, AuthResponse>('/auth/me');
  //       return response;
  //     } catch (error) {
  //       console.error('Get current user error:', error);
  //       throw error;
  //     }
  //   }

  //   /**
  //    * Refresh token
  //    */
  //   async refreshToken(): Promise<AuthResponse> {
  //     try {
  //       const response = await axiosInstance.post<never, AuthResponse>('/auth/refresh');

  //       if (response.success && response.data.token) {
  //         localStorage.setItem('edu_token', response.data.token);
  //       }

  //       return response;
  //     } catch (error) {
  //       console.error('Refresh token error:', error);
  //       throw error;
  //     }
  //   }

  /**
   * Kiểm tra token có hợp lệ không
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('edu_token');
    return !!token;
  }

  /**
   * Lấy token từ localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('edu_token');
  }
}

// Export singleton instance
export default new AuthService();
