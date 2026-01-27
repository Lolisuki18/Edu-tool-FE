import type { ConfirmProps } from '@/interface/confirm.interface';
import { CONFIRM_VARIANT } from '@/types/confirm.types';

const variantStyles = {
  [CONFIRM_VARIANT.DANGER]: 'bg-red-600 hover:bg-red-700',
  [CONFIRM_VARIANT.WARNING]: 'bg-yellow-500 hover:bg-yellow-600',
  [CONFIRM_VARIANT.INFO]: 'bg-blue-600 hover:bg-blue-700',
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  variant,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <p className="mt-3 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm text-white ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
