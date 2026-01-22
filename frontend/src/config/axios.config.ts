import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';


interface CustomAxiosInstance extends AxiosInstance {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('edu_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    let errorMessage = 'Đã có lỗi xảy ra';

    if (error.response) {
      const { status, data } = error.response;
      const serverMessage = (data as any)?.message || (data as any)?.error;
      switch (status) {
        case 400:
          errorMessage = serverMessage || 'Dữ liệu gửi đi không hợp lệ';
          break;
        case 401:
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('edu_token');
            localStorage.removeItem('edu_user');
            window.location.href = '/login';
            errorMessage = 'Phiên đăng nhập hết hạn';
          }
          break;
        case 403:
          errorMessage = 'Bạn không có quyền truy cập tài nguyên này';
          break;
        case 404:
          errorMessage = 'Không tìm thấy dữ liệu yêu cầu';
          break;
        case 500:
          errorMessage = 'Lỗi hệ thống máy chủ. Vui lòng thử lại sau';
          break;
        default:
          errorMessage = serverMessage || `Lỗi: ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.';
    } else {
      errorMessage = error.message;
    }

    console.error(`[API Error]: ${errorMessage}`);
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
