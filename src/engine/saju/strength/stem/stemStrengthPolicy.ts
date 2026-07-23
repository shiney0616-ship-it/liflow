import type { ElementRelation } from '../../types';
import type { ScoreReasonCode } from '../types';

export interface StemStrengthPolicy {
  baseScore: number;
  reasonCode: ScoreReasonCode;
}

export const STEM_STRENGTH_POLICY: Record<
  ElementRelation,
  StemStrengthPolicy
> = {
  same: {
    baseScore: 5,
    reasonCode: 'STEM_SAME',
  },

  generatedBy: {
    baseScore: 4,
    reasonCode: 'STEM_GENERATED_BY',
  },

  generates: {
    baseScore: -3,
    reasonCode: 'STEM_GENERATES',
  },

  controls: {
    baseScore: -4,
    reasonCode: 'STEM_CONTROLS',
  },

  controlledBy: {
    baseScore: -2,
    reasonCode: 'STEM_CONTROLLED_BY',
  },
};