export interface ExportCSVResponse {
  data: Blob;
  headers?: Record<string, string> | { get?: (key: string) => string | null };
}

export interface CSVInputProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (fileName: string) => Promise<void>;
  defaultFileName: string;
}

export interface ImportDataResponse {
  successCount: number;
  errorCount: number;
  totalRows: number;
  errors: string[];
  message: string;
}

export interface ImportCSVProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  endpoint: string;
  title: string;
}
