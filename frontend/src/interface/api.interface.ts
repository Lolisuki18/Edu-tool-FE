export interface ErrorDetail {
  field: string;
  message: string;
  code: string;
}

export interface ApiResponse<T = object> {
  code: number;
  data: T;
  errors: Array<ErrorDetail>;
  message: string;
  success: boolean;
  timestamp: string;
}
