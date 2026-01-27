/**
 * EduTool Design System - Typography Constants
 * Academic-focused typography system
 *
 * @usage
 * import { TYPOGRAPHY } from '@/theme/typography';
 * style={{ fontSize: TYPOGRAPHY.fontSize.h1, lineHeight: TYPOGRAPHY.lineHeight.h1 }}
 */

export const TYPOGRAPHY = {
  fontFamily: {
    base: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },

  fontSize: {
    h1: '30px',
    h2: '24px',
    h3: '20px',
    body: '16px',
    small: '14px',
    caption: '12px',
  },

  lineHeight: {
    h1: '40px',
    h2: '34px',
    h3: '30px',
    body: '26px',
    small: '22px',
    caption: '18px',
  },

  fontWeight: {
    normal: 400, // Body content
    medium: 500, // Labels, metadata
    semibold: 600, // Headings, buttons
  },
} as const;

// CSS Variable mapping
export const TYPOGRAPHY_VARS = {
  fontFamily: 'var(--font-family-base)',
  fontSize: {
    h1: 'var(--font-size-h1)',
    h2: 'var(--font-size-h2)',
    h3: 'var(--font-size-h3)',
    body: 'var(--font-size-body)',
    small: 'var(--font-size-small)',
    caption: 'var(--font-size-caption)',
  },
  lineHeight: {
    h1: 'var(--line-height-h1)',
    h2: 'var(--line-height-h2)',
    h3: 'var(--line-height-h3)',
    body: 'var(--line-height-body)',
    small: 'var(--line-height-small)',
    caption: 'var(--line-height-caption)',
  },
} as const;
