import type {
  Branch,
  Element,
  MonthStrengthResult,
} from '../../types';
  
  import {
  getElementRelation,
} from '../../elementRelations';
  
  import {
  MONTH_STRENGTH_MAX_SCORE,
  MONTH_STRENGTH_POLICY,
} from './monthStrengthPolicy';
  
  export function calculateMonthStrength(
    monthBranch: Branch,
    monthElement: Element,
    dayMasterElement: Element,
  ): MonthStrengthResult {
    const relation = getElementRelation(
      monthElement,
      dayMasterElement,
    );
  
    const policy = MONTH_STRENGTH_POLICY[relation];
  
    return {
      monthBranch,
      monthElement,
      dayMasterElement,
  
      relation,
      effect: policy.effect,
  
      score: policy.score,
      maxAbsScore: MONTH_STRENGTH_MAX_SCORE,
    };
  }