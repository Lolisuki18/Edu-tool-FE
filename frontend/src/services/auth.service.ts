import axiosInstance from '@/config/axios.config';
import type { AuthResponse, LoginRequest } from '@/types/auth.types';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const data = await axiosInstance.post<AuthResponse>('/auth/login', credentials);

    if (data.accessToken) {
      localStorage.setItem('edu_token', data.accessToken);

      //   if (data.user) {
      //     localStorage.setItem('edu_user', JSON.stringify(data.user));
      //   }
    }

    return data;
  }

  //   async register(userData: RegisterRequest): Promise<AuthResponse> {
  //     try {
  //       const response = await axiosInstance.post<never, AuthResponse>('/auth/register', userData);

  //       // Lưu token vào localStorage
  //       if (response.success && response.data.token) {
  //         localStorage.setItem('edu_token', response.data.token);
  //         localStorage.setItem('edu_user', JSON.stringify(response.data.user));
  //       }

  //       return response;
  //     } catch (error) {
  //       console.error('Register error:', error);
  //       throw error;
  //     }
  //   }

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
