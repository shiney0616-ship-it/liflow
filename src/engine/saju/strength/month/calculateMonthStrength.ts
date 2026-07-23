import type {
  Branch,
  Stem,
} from '../../types';

import {
  getBranchElement,
  getStemElement,
} from '../../element';

import {
  getElementRelation,
} from '../../elementRelations';

import {
  createScoreDetail,
} from '../createScoreDetail';

import type {
  MonthStrengthResult,
} from './types';

import {
  MONTH_STRENGTH_POLICY,
} from './monthStrengthPolicy';

export function calculateMonthStrength(
  dayStem: Stem,
  monthBranch: Branch,
): MonthStrengthResult {
  const dayMasterElement =
    getStemElement(dayStem);

  const monthElement =
    getBranchElement(monthBranch);

  const relation =
    getElementRelation(
      monthElement,
      dayMasterElement,
    );

  const policy =
    MONTH_STRENGTH_POLICY[relation];

  const detail = createScoreDetail({
    category: 'month',
    baseScore: policy.score,
    reasonCode: policy.reasonCode,

    metadata: {
      dayStem,
      dayMasterElement,
      monthBranch,
      monthElement,
      relation,
      effect: policy.effect,
    },
  });

  return {
    monthBranch,
    monthElement,
    dayMasterElement,

    relation,
    effect: policy.effect,

    totalScore: detail.score,
    details: [detail],
  };
}