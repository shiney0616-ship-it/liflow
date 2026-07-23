import type {
    FourPillars,
    PillarPosition,
} from '../types';
  
  import {
    calculateMonthStrength,
} from './month/calculateMonthStrength';
  
  import {
    calculateRootStrength,
} from './root/calculateRootStrength';
  
  import {
    calculateStemStrength,
} from './stem/calculateStemStrength';
  
  import {
    calculateDistributionStrength,
} from './distribution/calculateDistributionStrength';
  
  import {
    getStrengthLevel,
} from './strengthLevelPolicy';
  
  import type {
    StrengthResult,
} from './types';
  
  const PILLAR_POSITIONS: PillarPosition[] = [
    'year',
    'month',
    'day',
    'hour',
  ];
  
  export function calculateStrength(
    pillars: FourPillars,
  ): StrengthResult {
    const dayStem = pillars.day.stem;
  
    const branches = PILLAR_POSITIONS.map(
      position => ({
        position,
        branch: pillars[position].branch,
      }),
    );
  
    const stems = PILLAR_POSITIONS.map(
      position => ({
        position,
        stem: pillars[position].stem,
      }),
    );
  
    const month = calculateMonthStrength(
      dayStem,
      pillars.month.branch,
    );
  
    const root = calculateRootStrength(
      dayStem,
      branches,
    );
  
    const stem = calculateStemStrength(
      dayStem,
      stems,
    );
  
    const distribution =
      calculateDistributionStrength(
        dayStem,
        pillars,
      );
  
    const totalScore =
      month.totalScore +
      root.totalScore +
      stem.totalScore +
      distribution.totalScore;
  
    return {
      month,
      root,
      stem,
      distribution,
  
      totalScore,
      level: getStrengthLevel(totalScore),
  
      details: [
        ...month.details,
        ...root.details,
        ...stem.details,
        ...distribution.details,
      ],
    };
  }