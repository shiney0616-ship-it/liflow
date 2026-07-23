import type { ElementRelation } from '../../types';
import type { ScoreReasonCode } from '../types';

export type MonthStrengthEffect =
  | 'support'
  | 'drain'
  | 'suppress';

export interface MonthStrengthPolicy {
  score: number;
  effect: MonthStrengthEffect;
  reasonCode: ScoreReasonCode;
}

export const MONTH_STRENGTH_MAX_SCORE = 40;

export const MONTH_STRENGTH_POLICY: Record<
  ElementRelation,
  MonthStrengthPolicy
> = {
  /*
   * 월지와 일간이 같은 오행
   */
  same: {
    score: 40,
    effect: 'support',
    reasonCode: 'MONTH_SAME',
  },

  /*
   * 월지 오행이 일간을 생함
   *
   * 예: 火 → 土
   */
  generates: {
    score: 30,
    effect: 'support',
    reasonCode: 'MONTH_GENERATES',
  },

  /*
   * 일간이 월지 오행을 생함
   *
   * 월지는 일간으로부터 생을 받는 관계
   */
  generatedBy: {
    score: -25,
    effect: 'drain',
    reasonCode: 'MONTH_GENERATED_BY',
  },

  /*
   * 월지 오행이 일간을 극함
   */
  controls: {
    score: -40,
    effect: 'suppress',
    reasonCode: 'MONTH_CONTROLS',
  },

  /*
   * 일간이 월지 오행을 극함
   *
   * 월지는 일간에게 극을 받는 관계
   */
  controlledBy: {
    score: -15,
    effect: 'drain',
    reasonCode: 'MONTH_CONTROLLED_BY',
  },
};