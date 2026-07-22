import type {
    Branch,
    HiddenStemRole,
    PillarPosition
} from '../../types';
  
import type {
    ScoreDetail,
} from '../types';
  
export type RootType =
  | HiddenStemRole
  | 'none';

export interface RootResult {
  position: PillarPosition;
  branch: Branch;
  rootType: RootType;

  baseScore: number;
  modifier: number;
  score: number;
}

export interface RootStrengthResult {

    roots: RootResult[];
  
    totalScore: number;
  
    details: ScoreDetail[];
}

export const ROOT_STRENGTH_POLICY: Record<
    HiddenStemRole | 'none',
    {
        baseScore: number;
    }
> = {
    main: {
        baseScore: 12,
    },

    middle: {
        baseScore: 7,
    },

    initial: {
        baseScore: 3,
    },

    none: {
        baseScore: 0,
    },
} as const;