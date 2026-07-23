import type {
    Branch,
    Element,
    ElementRelation,
    PillarPosition,
    Stem,
} from '../../types';
  
  import type {
    ScoreDetail,
} from '../types';
  
  export type DistributionSource =
    | 'stem'
    | 'branch';
  
  export interface DistributionResult {
    position: PillarPosition;
    source: DistributionSource;
  
    stem?: Stem;
    branch?: Branch;
  
    element: Element;
    relation: ElementRelation;
  
    baseScore: number;
    modifier: number;
    score: number;
  }
  
  export interface DistributionStrengthResult {
    distributions: DistributionResult[];
    totalScore: number;
    details: ScoreDetail[];
  }