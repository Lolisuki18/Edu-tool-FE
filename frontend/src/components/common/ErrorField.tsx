import { AlertCircle } from 'lucide-react';

import type { ErrorDetail } from '@/interface/api.interface';
import { translateErrorMessage } from '@/utils/errorTranslator';

interface ErrorFieldProps {
  errors: ErrorDetail[];
  field: string;
}

const ErrorField = ({ errors, field }: ErrorFieldProps) => (
  <>
    {errors
      .filter(error => error.field === field)
      .map((error, idx) => (
        <p
          key={idx}
          className="text-red-500 text-sm mt-1.5 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle size={14} /> {translateErrorMessage(error.message, error.code)}
        </p>
      ))}
  </>
);

export default ErrorField;
