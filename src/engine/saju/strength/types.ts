import type { DistributionStrengthResult } from './distribution/types';
import type { MonthStrengthResult } from './month/types';
import type { RootStrengthResult } from './root/types';
import type { StemStrengthResult } from './stem/types';

export type StrengthCategory =
  | 'month'
  | 'root'
  | 'stem'
  | 'distribution';

export type StrengthLevel =
  | 'veryWeak'
  | 'weak'
  | 'balanced'
  | 'strong'
  | 'veryStrong';

export type ScoreReasonCode =
  // 월령
  | 'MONTH_SAME'
  | 'MONTH_GENERATES'
  | 'MONTH_GENERATED_BY'
  | 'MONTH_CONTROLS'
  | 'MONTH_CONTROLLED_BY'

  // 통근
  | 'ROOT_MAIN'
  | 'ROOT_MIDDLE'
  | 'ROOT_INITIAL'
  | 'ROOT_NONE'

  // 천간
  | 'STEM_SAME'
  | 'STEM_GENERATES'
  | 'STEM_GENERATED_BY'
  | 'STEM_CONTROLS'
  | 'STEM_CONTROLLED_BY'

  // 오행
  | 'ELEMENT_BALANCED'
  | 'ELEMENT_IMBALANCED'

  // 오행분포 생극
  | 'DISTRIBUTION_SAME'
  | 'DISTRIBUTION_GENERATED_BY'
  | 'DISTRIBUTION_GENERATES'
  | 'DISTRIBUTION_CONTROLS'
  | 'DISTRIBUTION_CONTROLLED_BY';

export interface ScoreDetail {
    category: StrengthCategory;
  
    baseScore: number;   // 정책상 기본 점수
    modifier: number;   // 보정치 (+2, -3 등)
    score: number;       // 최종 점수
  
    reasonCode: ScoreReasonCode;
    metadata?: Record<string, unknown>;
  }

export interface StrengthResult {
    month: MonthStrengthResult;
    root: RootStrengthResult;
    stem: StemStrengthResult;
    distribution: DistributionStrengthResult;
  
    totalScore: number;
    level: StrengthLevel;
    details: ScoreDetail[];
  }