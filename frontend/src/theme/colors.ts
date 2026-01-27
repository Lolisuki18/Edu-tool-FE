/**
 * EduTool Design System - Color Constants
 * Academic-focused color palette
 *
 * @usage
 * import { COLORS } from '@/theme/colors';
 * style={{ backgroundColor: COLORS.primary }}
 */

export const COLORS = {
  // Primary - Academic Blue
  primary: '#1E40AF',
  primaryHover: '#1E3A8A',
  primaryActive: '#172554',

  // Secondary - Neutral Slate
  secondary: '#475569',
  secondaryHover: '#334155',

  // Semantic Colors
  success: '#15803D',
  successLight: '#22C55E',
  info: '#0369A1',
  warning: '#B45309',
  error: '#B91C1C',

  // Neutral Palette
  background: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  disabled: '#CBD5E1',

  // Additional neutrals for flexibility
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const;

export type ColorKey = keyof typeof COLORS;

// CSS Variable mapping (for dynamic usage)
export const CSS_VARS = {
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  primaryActive: 'var(--color-primary-active)',
  secondary: 'var(--color-secondary)',
  secondaryHover: 'var(--color-secondary-hover)',
  success: 'var(--color-success)',
  successLight: 'var(--color-success-light)',
  info: 'var(--color-info)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  background: 'var(--color-background)',
  card: 'var(--color-card)',
  border: 'var(--color-border)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  disabled: 'var(--color-disabled)',
} as const;
