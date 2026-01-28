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
