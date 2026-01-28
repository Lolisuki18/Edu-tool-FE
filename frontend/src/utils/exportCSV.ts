import type { ExportCSVResponse } from '@/interface/csv.interface';

import { showError } from './toast';

export const ExportCSV = async (
  response: ExportCSVResponse | Blob,
  overrideFileName?: string
): Promise<void> => {
  try {
    let blob: Blob;
    let filename = overrideFileName || 'users.csv';

    //  Blob and file name
    if (response instanceof Blob) {
      blob = response;
    } else if (response && typeof response === 'object' && 'data' in response) {
      blob = response.data;
      if (!overrideFileName) {
        const disposition =
          response.headers instanceof Headers
            ? response.headers.get('content-disposition')
            : (response.headers as any)?.['content-disposition'];

        if (disposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            let extractedName = matches[1].replace(/['"]/g, '');
            if (extractedName.toLowerCase().startsWith("utf-8''")) {
              extractedName = decodeURIComponent(extractedName.substring(7));
            }
            if (extractedName) filename = extractedName;
          }
        }
      }
    } else {
      showError('Không thể tải file CSV. (response không hợp lệ)');
      return;
    }

    let finalBlob: Blob;

    if (blob.type === 'text/csv' || filename.endsWith('.csv')) {
      const text = await blob.text();

      // 2. Format Date (HH:mm DD/MM/YYYY) adn "lock" format for Excel
      const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?/g;

      const formattedText = text.replace(isoDateRegex, match => {
        const date = new Date(match);
        if (isNaN(date.getTime())) return match;

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const dateStr = `${hours}:${minutes} ${day}/${month}/${year}`;

        // Add the non-display character (\u200c) so Excel understands this is plain text.
        return `\u200c${dateStr}`;
      });

      // Change the separator to ';' (Excel Vietnam/Europe) and add a BOM.
      const processedText = formattedText.replace(/,/g, ';');
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      finalBlob = new Blob([bom, processedText], { type: 'text/csv;charset=utf-8' });
    } else {
      finalBlob = blob;
    }

    //Download
    const url = window.URL.createObjectURL(finalBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
    }, 150);
  } catch (err) {
    console.error('Export CSV error:', err);
    showError('Có lỗi xảy ra khi xuất file.');
  }
};
