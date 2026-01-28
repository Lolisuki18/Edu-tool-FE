import { useState } from 'react';

import type { CSVInputProps } from '@/interface/csv.interface';

const ExportFileNameModal = ({ isOpen, onClose, onConfirm, defaultFileName }: CSVInputProps) => {
  const [fileName, setFileName] = useState(defaultFileName);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!fileName.trim()) return;
    setLoading(true);
    try {
      const finalName = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;
      await onConfirm(finalName);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4 transition-all duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Xuất dữ liệu CSV</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên tập tin</label>
          <input
            type="text"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConfirm()}
            placeholder="Nhập tên file..."
            disabled={loading}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            disabled={loading || !fileName.trim()}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang xử lý...
              </>
            ) : (
              'Xác nhận xuất'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportFileNameModal;
