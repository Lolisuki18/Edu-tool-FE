import type { ErrorDetail } from './api.interface';

export interface ErrorFieldProps {
  errors: ErrorDetail[];
  field: string;
}
