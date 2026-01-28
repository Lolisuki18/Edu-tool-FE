import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { AUTH_PATHS } from '@/constants/auth/auth.path';
// --- Interface & Config ---
interface CustomAxiosInstance extends AxiosInstance {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
    const tokenStr = localStorage.getItem('edu_token');
    if (tokenStr) {
      const accessToken = JSON.parse(tokenStr);
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Axios Response', response);
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    let errorMessage = 'Đã có lỗi xảy ra';

    if (error.response) {
      const { status, data } = error.response;
      const serverMessage = (data as any)?.message || (data as any)?.error;

      if (status === 401 && !originalRequest._retry) {
        if (window.location.pathname === AUTH_PATHS.LOGIN) {
          localStorage.removeItem('edu_user');
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshResponse = await axios.post(
            `${BASE_URL}${AUTH_PATHS.REFRESH_TOKEN}`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = refreshResponse.data.accessToken;

          const userStr = localStorage.getItem('edu_user');
          if (userStr) {
            const user = JSON.parse(userStr);
            user.accessToken = newAccessToken;
            localStorage.setItem('edu_user', JSON.stringify(user));
          }

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem('edu_user');
          window.location.href = AUTH_PATHS.LOGIN;
          return Promise.reject(new Error('Phiên đăng nhập đã hết hạn hoàn toàn.'));
        } finally {
          isRefreshing = false;
        }
      }
      if (status === 400 && (data as any)?.errors) {
        const customError = new Error(serverMessage || 'Dữ liệu không hợp lệ');
        (customError as any).response = error.response;
        return Promise.reject(customError);
      }

      switch (status) {
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
