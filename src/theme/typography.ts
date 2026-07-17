import type { TextStyle } from 'react-native';

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },

  titleLarge: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },

  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },

  bodyLarge: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },

  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },

  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },

  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
} satisfies Record<string, TextStyle>;

export type TypographyKey = keyof typeof typography;