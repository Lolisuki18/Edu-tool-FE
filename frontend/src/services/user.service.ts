import axiosInstance from '@/config/axios.config';
import type { ApiResponse } from '@/types/interface/api.interface';
import type { Users } from '@/types/interface/user.interface';

interface PaginatedResponse {
  content: Users[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}

class UserService {
  async getAllUser(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'userId',
    sortDirection: string = 'ASC'
  ): Promise<ApiResponse<PaginatedResponse>> {
    try {
      const response = await axiosInstance.get(
        '/users?' +
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
}
export default new UserService();
