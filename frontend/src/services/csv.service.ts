import { AxiosHeaders } from 'axios';

import axiosInstance from '@/config/axios.config';
import type { ApiResponse } from '@/interface';
import type { ImportDataResponse } from '@/interface/csv.interface';

class CsvSerivce {
  async exportCsv(endpoint: string): Promise<any> {
    return await axiosInstance.get(`${endpoint}`, {
      responseType: 'blob',
      headers: new AxiosHeaders(),
    });
  }
  async importUsersCsv(
    file: File,
    endpoint: string,
    fileKey: string = 'file'
  ): Promise<ApiResponse<ImportDataResponse>> {
    try {
      const formData = new FormData();
      formData.append(fileKey, file);

      const response = await axiosInstance.post(`${endpoint}`, formData, {
        headers: new AxiosHeaders({
          'Content-Type': 'multipart/form-data',
        }),
      });

      return response as any;
    } catch (error) {
      console.error('Import users error:', error);
      throw error;
    }
  }

  //   try {
  //     const formData = new FormData();
  //     formData.append(fileKey, file); // Dùng fileKey truyền vào cho linh hoạt

  //     const response = await axiosInstance.post(endpoint, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     return response as any;
  //   } catch (error) {
  //     throw error;
  //   }
}
export default new CsvSerivce();
