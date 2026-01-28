import type { ApiResponse } from '@/interface';
import type { ImportDataResponse } from '@/interface/csv.interface';
import csvService from '@/services/csv.service';

export const ImportCSV = async (
  file: File,
  endpoint: string,
  fileKey: string = 'file'
): Promise<ApiResponse<ImportDataResponse> | null> => {
  const formData = new FormData();
  formData.append(fileKey, file);

  try {
    return await csvService.importUsersCsv(file, endpoint, fileKey);
  } catch (err) {
    console.error('Import Error:', err);
    return null;
  }
};
