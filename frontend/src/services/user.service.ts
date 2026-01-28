import axiosInstance from '@/config/axios.config';
import { USER_PATH } from '@/constants/user/user.path';
import type { ApiResponse } from '@/interface/api.interface';
import type { PaginatedResponse } from '@/interface/page.interface';
import type { UserFormState, Users } from '@/interface/user.interface';
import { AxiosHeaders } from 'axios';

class UserService {
  async getAllUser(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'userId',
    sortDirection: string = 'ASC'
  ): Promise<ApiResponse<PaginatedResponse>> {
    try {
      const response = await axiosInstance.get(
        `${USER_PATH.ROOT}?` +
          new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sortBy,
            sortDirection,
          }).toString()
      );
      return response as ApiResponse<PaginatedResponse>;
    } catch (error) {
      console.error(' Get all users error:', error);
      throw error;
    }
  }
  async createUser(request: UserFormState): Promise<ApiResponse<Users>> {
    try {
      const response = await axiosInstance.post(`${USER_PATH.ROOT}`, request);
      return response;
    } catch (error) {
      console.error('Create user have error', error);
      throw error;
    }
  }

  async updateUser(request: UserFormState): Promise<ApiResponse<Users>> {
    try {
      const response = await axiosInstance.put(`${USER_PATH.ROOT}/${request.id}`, request);
      return response;
    } catch (error) {
      console.error('Create user have error', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.delete(`${USER_PATH.ROOT}/${id}`);

      return response;
    } catch (error) {
      console.error('Delete user have error', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<ApiResponse<Users>> {
    try {
      const response = await axiosInstance.get(`${USER_PATH.ROOT}/${id}`);
      return response;
    } catch (error) {
      console.error('Get user by id have error', error);
      throw error;
    }
  }
  async exportUsersCsv(): Promise<any> {
    // Trả về toàn bộ response để FE lấy cả data (blob) và headers
    return await axiosInstance.get(`${USER_PATH.EXPORT_CSV}`, {
      responseType: 'blob',
      headers: new AxiosHeaders(),
    });
  }
}
export default new UserService();
