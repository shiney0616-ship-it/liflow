import type {
    ScoreDetail,
    ScoreReasonCode,
    StrengthCategory,
} from './types';
  
  interface CreateScoreDetailParams {
    category: StrengthCategory;
  
    baseScore: number;
    modifier?: number;
  
    reasonCode: ScoreReasonCode;
  
    metadata?: Record<string, unknown>;
  }
  
  export function createScoreDetail({
    category,
    baseScore,
    modifier = 0,
    reasonCode,
    metadata,
  }: CreateScoreDetailParams): ScoreDetail {
    return {
      category,
  
      baseScore,
      modifier,
      score: baseScore + modifier,
  
      reasonCode,
      metadata,
    };
  }