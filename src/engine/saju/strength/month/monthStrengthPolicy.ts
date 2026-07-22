import type {
  ElementRelation,
  MonthStrengthEffect,
} from '../../types';
  
  export const MONTH_STRENGTH_MAX_SCORE = 40;
  
  export interface MonthStrengthPolicy {
    effect: MonthStrengthEffect;
    score: number;
  }
  
  export const MONTH_STRENGTH_POLICY: Record<
    ElementRelation,
    MonthStrengthPolicy
  > = {
    same: {
      effect: 'support',
      score: 40,
    },
  
    generates: {
      effect: 'support',
      score: 30,
    },
  
    generatedBy: {
      effect: 'drain',
      score: -25,
    },
  
    controlledBy: {
      effect: 'drain',
      score: -15,
    },
  
    controls: {
      effect: 'suppress',
      score: -40,
    },
  };