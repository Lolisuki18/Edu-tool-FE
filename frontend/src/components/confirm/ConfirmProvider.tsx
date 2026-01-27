import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { ConfirmOptions } from '@/interface/confirm.interface';
import { ConfirmContext } from '@/context/ConfirmContext';

import ConfirmModal from './ConfirmModal';

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);

    return new Promise<boolean>(resolve => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    resolverRef.current?.(true);
    setOptions(null);
  };

  const handleCancel = () => {
    resolverRef.current?.(false);
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {createPortal(
        <ConfirmModal
          open={!!options}
          title={options?.title ?? 'Confirm'}
          message={options?.message ?? ''}
          confirmText={options?.confirmText ?? 'Confirm'}
          cancelText={options?.cancelText ?? 'Cancel'}
          variant={options?.variant ?? 'info'}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />,
        document.body
      )}
    </ConfirmContext.Provider>
  );
}
