export const CONFIRM_VARIANT = {
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
};

export type ConfirmVariant = (typeof CONFIRM_VARIANT)[keyof typeof CONFIRM_VARIANT];
