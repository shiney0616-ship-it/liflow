import type { ScoreReasonCode } from '../types';
import type { RootType } from './types';

export interface RootStrengthPolicy {
  baseScore: number;
  reasonCode: ScoreReasonCode;
}

export const ROOT_STRENGTH_POLICY: Record<
  RootType,
  RootStrengthPolicy
> = {
  main: {
    baseScore: 12,
    reasonCode: 'ROOT_MAIN',
  },

  middle: {
    baseScore: 7,
    reasonCode: 'ROOT_MIDDLE',
  },

  initial: {
    baseScore: 3,
    reasonCode: 'ROOT_INITIAL',
  },

  none: {
    baseScore: 0,
    reasonCode: 'ROOT_NONE',
  },
};