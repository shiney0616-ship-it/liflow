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
  | 'MONTH_CONTROLS'

  // 통근
  | 'ROOT_MAIN'
  | 'ROOT_MIDDLE'
  | 'ROOT_HIDDEN'

  // 천간
  | 'STEM_SUPPORT'
  | 'STEM_DRAIN'

  // 오행
  | 'ELEMENT_BALANCED'
  | 'ELEMENT_IMBALANCED';

  export interface ScoreDetail {
    category: StrengthCategory;
  
    baseScore: number;   // 정책상 기본 점수
    modifier: number;   // 보정치 (+2, -3 등)
    score: number;       // 최종 점수
  
    reasonCode: ScoreReasonCode;
    metadata?: Record<string, unknown>;
  }

  export interface StrengthResult {
    totalScore:number;
    level:StrengthLevel;
    details:ScoreDetail[];
}