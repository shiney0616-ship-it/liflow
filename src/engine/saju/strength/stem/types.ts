import type {
    ElementRelation,
    PillarPosition,
    Stem,
} from '../../types';
  
  import type { ScoreDetail } from '../types';
  
  export interface StemPosition {
    position: PillarPosition;
    stem: Stem;
  }
  
  export interface StemStrengthResultItem {
    position: PillarPosition;
    stem: Stem;
    relation: ElementRelation;
  
    baseScore: number;
    modifier: number;
    score: number;
  }
  
  export interface StemStrengthResult {
    stems: StemStrengthResultItem[];
    totalScore: number;
    details: ScoreDetail[];
  }