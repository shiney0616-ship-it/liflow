import type {
    ElementRelation,
} from '../../types';
  
  import type {
    ScoreReasonCode,
} from '../types';
  
export interface DistributionStrengthPolicy {
    baseScore: number;
    reasonCode: ScoreReasonCode;
  }
  
export const DISTRIBUTION_STRENGTH_POLICY: Record<
    ElementRelation,
    DistributionStrengthPolicy
  > = {
    same: {
      baseScore: 3,
      reasonCode: 'DISTRIBUTION_SAME',
    },
  
    generatedBy: {
      baseScore: 3,
      reasonCode: 'DISTRIBUTION_GENERATED_BY',
    },
  
    generates: {
      baseScore: -2,
      reasonCode: 'DISTRIBUTION_GENERATES',
    },
  
    controls: {
      baseScore: -2,
      reasonCode: 'DISTRIBUTION_CONTROLS',
    },
  
    controlledBy: {
      baseScore: -3,
      reasonCode: 'DISTRIBUTION_CONTROLLED_BY',
    },
  };