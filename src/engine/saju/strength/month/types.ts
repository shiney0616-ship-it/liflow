import type {
    Branch,
    Element,
    ElementRelation,
} from '../../types';
  
  import type {
    ScoreDetail,
} from '../types';
  
  import type {
    MonthStrengthEffect,
} from './monthStrengthPolicy';
  
  export interface MonthStrengthResult {
    monthBranch: Branch;
    monthElement: Element;
    dayMasterElement: Element;
  
    relation: ElementRelation;
    effect: MonthStrengthEffect;
  
    totalScore: number;
    details: ScoreDetail[];
  }