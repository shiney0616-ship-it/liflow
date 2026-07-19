import {
    BRANCH_CHUNG,
    BRANCH_HAE,
    BRANCH_HYUNG,
    BRANCH_PA,
    BRANCH_YUKHAP
} from './relationTables';

import type {
    BranchPosition,
    BranchRelation,
} from '../types';

function hasRelation(
  table: readonly (readonly [string, string])[],
  a: string,
  b: string,
): boolean {
  return table.some(
    ([x, y]) =>
      (x === a && y === b) ||
      (x === b && y === a),
  );
}

export function isChung(a: string, b: string): boolean {
  return hasRelation(BRANCH_CHUNG, a, b);
}

export function isYukhap(a: string, b: string): boolean {
  return hasRelation(BRANCH_YUKHAP, a, b);
}

interface Hyunginfo {
    subtype: string;
}

export function getHyungInfo(
    a: string,
    b: string,
): Hyunginfo | undefined {
    const relation = BRANCH_HYUNG.find(({branches}) => {
        const [x, y] = branches;

        return (
            (x === a && y === b) ||
            (x === b && y === a)
        );
    })
    
    if (!relation) {
        return undefined;
    }

    return {
        subtype: relation.subtype,
    }
}

export function isHyung(a: string, b: string): boolean {
    return getHyungInfo(a, b) !== undefined;
}

export function isPa(a: string, b: string): boolean {
    return hasRelation(BRANCH_PA, a, b);
}

export function isHae(a: string, b: string): boolean {
    return hasRelation(BRANCH_HAE, a, b);
}

export function findBranchRelations(
  pillars: BranchPosition[],
): BranchRelation[] {
  const relations: BranchRelation[] = [];

  for (let i = 0; i < pillars.length - 1; i += 1) {
    for (let j = i + 1; j < pillars.length; j += 1) {
      const left = pillars[i];
      const right = pillars[j];

      if (isChung(left.branch, right.branch)) {
        relations.push({
          type: '충',
          pillars: [left.position, right.position],
          branches: [left.branch, right.branch],
          score: 3,
        });
      }

      if (isYukhap(left.branch, right.branch)) {
        relations.push({
          type: '육합',
          pillars: [left.position, right.position],
          branches: [left.branch, right.branch],
          score: 2,
        });
      }

      const hyungInfo = getHyungInfo(
        left.branch,
        right.branch,
      );

      if (hyungInfo) {
        relations.push({
            type: '형',
            subtype: hyungInfo.subtype,
            pillars: [left.position, right.position],
            branches: [left.branch, right.branch],
            score: 2,
        })
      }

      if (isPa(left.branch, right.branch)) {
        relations.push({
          type: '파',
          pillars: [left.position, right.position],
          branches: [left.branch, right.branch],
          score: 1,
        });
      }

      if (isHae(left.branch, right.branch)) {
        relations.push({
          type: '해',
          pillars: [left.position, right.position],
          branches: [left.branch, right.branch],
          score: 1,
        });
      }
    }
  }

  return relations;
}
