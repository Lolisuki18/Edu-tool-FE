import { createContext } from 'react';

import type { ConfirmOptions } from '@/interface/confirm.interface';

export interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null);
