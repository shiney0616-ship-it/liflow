export const colors = {
  primary: '#6C5CE7',
  primaryPressed: '#5848C2',
  primaryLight: '#F0EDFF',

  background: '#F8F8FB',
  surface: '#FFFFFF',

  textPrimary: '#1F1F24',
  textSecondary: '#66666F',
  textTertiary: '#9999A3',
  textInverse: '#FFFFFF',

  border: '#E2E2E8',
  borderFocused: '#6C5CE7',

  disabled: '#D4D4DA',
  disabledText: '#9999A3',

  error: '#E5484D',
  success: '#2E9B63',
  warning: '#D99000',

  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;