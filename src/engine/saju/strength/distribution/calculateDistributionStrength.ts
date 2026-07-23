import type {
    FourPillars,
    PillarPosition,
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
  
  import {
    StrengthAccumulator,
} from '../StrengthAccumulator';
  
  import type {
    DistributionResult,
    DistributionStrengthResult,
} from './types';
  
  import {
    DISTRIBUTION_STRENGTH_POLICY,
} from './distributionStrengthPolicy';
  
  const MAX_DISTRIBUTION_SCORE = 15;
  
  const PILLAR_POSITIONS: PillarPosition[] = [
    'year',
    'month',
    'day',
    'hour',
  ];
  
  export function calculateDistributionStrength(
    dayStem: Stem,
    pillars: FourPillars,
  ): DistributionStrengthResult {
    const accumulator =
      new StrengthAccumulator();
  
    const distributions: DistributionResult[] = [];
  
    const dayStemElement =
      getStemElement(dayStem);
  
    for (const position of PILLAR_POSITIONS) {
      const pillar = pillars[position];
  
      /*
       * 천간 분포
       *
       * 일간 자신은 제외한다.
       */
      if (position !== 'day') {
        const stemElement =
          getStemElement(pillar.stem);
  
        const relation =
          getElementRelation(
            dayStemElement,
            stemElement,
          );
  
        const policy =
          DISTRIBUTION_STRENGTH_POLICY[relation];
  
        const detail =
          createScoreDetail({
            category: 'distribution',
            baseScore: policy.baseScore,
            reasonCode: policy.reasonCode,
            metadata: {
              position,
              source: 'stem',
              stem: pillar.stem,
              element: stemElement,
              relation,
            },
          });
  
        accumulator.add(detail);
  
        distributions.push({
          position,
          source: 'stem',
          stem: pillar.stem,
          element: stemElement,
          relation,
          baseScore: detail.baseScore,
          modifier: detail.modifier,
          score: detail.score,
        });
      }
  
      /*
       * 지지 분포
       *
       * 지장간 전체가 아니라 지지 본래 오행만 평가한다.
       */
      const branchElement =
        getBranchElement(pillar.branch);
  
      const branchRelation =
        getElementRelation(
          dayStemElement,
          branchElement,
        );
  
      const branchPolicy =
        DISTRIBUTION_STRENGTH_POLICY[
          branchRelation
        ];
  
      const branchDetail =
        createScoreDetail({
          category: 'distribution',
          baseScore: branchPolicy.baseScore,
          reasonCode: branchPolicy.reasonCode,
          metadata: {
            position,
            source: 'branch',
            branch: pillar.branch,
            element: branchElement,
            relation: branchRelation,
          },
        });
  
      accumulator.add(branchDetail);
  
      distributions.push({
        position,
        source: 'branch',
        branch: pillar.branch,
        element: branchElement,
        relation: branchRelation,
        baseScore: branchDetail.baseScore,
        modifier: branchDetail.modifier,
        score: branchDetail.score,
      });
    }
  
    const rawTotalScore =
      accumulator.getTotalScore();
  
    const totalScore = Math.max(
      0,
      Math.min(
        rawTotalScore,
        MAX_DISTRIBUTION_SCORE,
      ),
    );
  
    return {
      distributions,
      totalScore,
      details: accumulator.getDetails(),
    };
  }