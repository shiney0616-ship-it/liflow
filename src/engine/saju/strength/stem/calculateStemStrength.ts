import type {
    Stem,
} from '../../types';
  
  import {
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
    StemPosition,
    StemStrengthResult,
    StemStrengthResultItem,
} from './types';
  
  import {
    STEM_STRENGTH_POLICY,
} from './stemStrengthPolicy';
  
  const MAX_STEM_SCORE = 15;
  
  export function calculateStemStrength(
    dayStem: Stem,
    stems: StemPosition[],
  ): StemStrengthResult {
    const accumulator = new StrengthAccumulator();
    const results: StemStrengthResultItem[] = [];
  
    const dayStemElement = getStemElement(dayStem);
  
    for (const { position, stem } of stems) {
      // 일간 자신은 득세 판정에서 제외
      if (position === 'day') {
        continue;
      }
  
      const stemElement = getStemElement(stem);
  
      const relation = getElementRelation(
        dayStemElement,
        stemElement,
      );
  
      const policy =
        STEM_STRENGTH_POLICY[relation];
  
      const detail = createScoreDetail({
        category: 'stem',
        baseScore: policy.baseScore,
        reasonCode: policy.reasonCode,
        metadata: {
          position,
          stem,
          relation,
        },
      });
  
      accumulator.add(detail);
  
      results.push({
        position,
        stem,
        relation,
        baseScore: detail.baseScore,
        modifier: detail.modifier,
        score: detail.score,
      });
    }
  
    const totalScore = Math.max(
        0,
        Math.min(
          accumulator.getTotalScore(),
          MAX_STEM_SCORE,
        ),
    );
  
    return {
      stems: results,
      totalScore,
      details: accumulator.getDetails(),
    };
  }