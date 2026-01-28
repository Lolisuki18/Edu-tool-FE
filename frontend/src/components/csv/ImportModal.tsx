import { useState, useRef } from 'react';

import type { ImportCSVProps, ImportDataResponse } from '@/interface/csv.interface';
import { showError, translateErrorMessage } from '@/utils';
import { ExportCSV } from '@/utils/exportCSV';
import { transformUserCSV } from '@/utils/transform';
import { ImportCSV } from '@/utils/importCSV';

export const ImportCSVModal = ({ isOpen, onClose, onSuccess, endpoint, title }: ImportCSVProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportDataResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleRetry = () => {
    setResult(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = async () => {
    const headers = 'username,password,fullName,email,role,status';
    const sampleData = 'nguyenvana,123456,Nguyen Van A,vana@example.com,STUDENT,ACTIVE';
    const csvContent = `\ufeff${headers}\n${sampleData}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    await ExportCSV(blob, 'template_import_users.csv');
  };
  const handleImport = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const processedFile = await transformUserCSV(file);
      const res = await ImportCSV(processedFile, endpoint);

      setLoading(false);
      if (res?.success) {
        setResult(res.data);
        onSuccess();
      } else {
        showError(res?.message || 'Lỗi dữ liệu bên trong file CSV.');
      }
    } catch {
      setLoading(false);
      showError('Không thể xử lý định dạng file này.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>

        {!result ? (
          <div className="space-y-4">
            <div
              onClick={() => !loading && fileInputRef.current?.click()}
              className={`border-2 border-dashed border-blue-200 rounded-lg p-8 flex flex-col items-center justify-center transition-all ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-blue-400 cursor-pointer bg-blue-50/30'
              }`}
            >
              <p className="text-blue-600 font-medium text-center">
                {file ? file.name : 'Nhấn để chọn file CSV'}
              </p>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                hidden
                onChange={e => setFile(e.target.files?.[0] || null)}
                disabled={loading}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                Tải file CSV mẫu
              </button>
              <span className="text-xs text-gray-400 italic">Hỗ trợ file: .csv</span>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                onClick={handleImport}
                disabled={!file || loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? 'Đang xử lý...' : 'Bắt đầu Import'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 uppercase font-bold">Tổng</p>
                <p className="text-xl font-bold">{result.totalRows}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 uppercase font-bold">Thành công</p>
                <p className="text-xl font-bold">{result.successCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-red-600 uppercase font-bold">Lỗi</p>
                <p className="text-xl font-bold">{result.errorCount}</p>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-green-700 font-medium">
                Đã import thành công: {result.successCount} dòng
              </span>
            </div>

            {result.errors.length > 0 && (
              <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50 text-sm text-red-500">
                <p className="font-bold mb-1">Chi tiết lỗi:</p>
                {result.errors.map((err, i) => (
                  <p key={i}>• {translateErrorMessage(err)}</p>
                ))}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRetry}
                className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Nộp lại file
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
