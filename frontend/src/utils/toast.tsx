import toast from 'react-hot-toast';
import type { ReactNode } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

type ToastMessage = string | ReactNode;

export const showSuccess = (msg: string) =>
  toast.custom(t =>
    t.visible ? (
      <div className="max-w-md w-full bg-green-50 shadow-xl rounded-xl p-4 flex gap-3 items-center">
        <div className="text-green-600 text-xl">
          <DoneIcon />
        </div>
        <div className="text-black flex-1">{msg}</div>
        <button onClick={() => toast.dismiss(t.id)} style={{ color: '#ef4444' }} aria-label="Đóng">
          <CloseIcon style={{ color: '#ef4444' }} />
        </button>
      </div>
    ) : null
  );

export const showError = (msg: string) =>
  toast.custom(t =>
    t.visible ? (
      <div className="max-w-md w-full bg-red-50 shadow-xl rounded-xl p-4 flex gap-3 items-center">
        <div className="text-red-600 text-xl">
          <CloseIcon />
        </div>
        <div className="text-black flex-1">{msg}</div>
        <button onClick={() => toast.dismiss(t.id)} style={{ color: '#ef4444' }} aria-label="Đóng">
          <CloseIcon style={{ color: '#ef4444' }} />
        </button>
      </div>
    ) : null
  );

export const successAndRedirect = (message: string, callback?: () => void, duration = 5000) => {
  toast.success(message, { duration });
  if (callback) {
    setTimeout(callback, duration);
  }
};
export const successWithClose = (
  message: ToastMessage,
  onRedirect?: () => void,
  duration = 5000
) => {
  let closed = false;

  toast.custom(
    t => (
      <div className="max-w-md w-full bg-amber-50 shadow-xl rounded-xl p-4 flex gap-3">
        <div className="text-green-600 text-xl">
          <DoneIcon />
        </div>
        <div className=" text-black flex-1">{message}</div>
        <button
          onClick={() => {
            closed = true;
            toast.dismiss(t.id);
          }}
          style={{ color: '#ef4444' }}
        >
          <CloseIcon style={{ color: '#ef4444' }} />
        </button>
      </div>
    ),
    { duration }
  );

  if (onRedirect) {
    setTimeout(() => {
      if (!closed) onRedirect();
    }, duration);
  }
};
