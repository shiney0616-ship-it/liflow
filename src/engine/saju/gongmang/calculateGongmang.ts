import type {
    Branch,
    BranchPosition,
    PillarPosition,
    Stem,
} from '../types';
  
  import {
    GONGMANG_GROUPS,
    type StemBranch,
} from './gongmangTable';
  
  export interface GongmangResult {
    branches: [Branch, Branch];
    hitPillars: PillarPosition[];
  }
  
  export function calculateGongmang(
    dayStem: Stem,
    dayBranch: Branch,
    branchesWithPosition: BranchPosition[],
  ): GongmangResult {
    const dayPillar =
      `${dayStem}${dayBranch}` as StemBranch;
  
    const group = GONGMANG_GROUPS.find(
      item => item.pillars.includes(dayPillar),
    );
  
    if (!group) {
      throw new Error(
        `공망을 계산할 수 없는 일주입니다: ${dayPillar}`,
      );
    }
  
    const emptyBranches: [Branch, Branch] = [
      group.emptyBranches[0],
      group.emptyBranches[1],
    ];
  
    const hitPillars = branchesWithPosition
      .filter(item =>
        emptyBranches.includes(item.branch),
      )
      .map(item => item.position);
  
    return {
      branches: emptyBranches,
      hitPillars,
    };
  }