import {
    BRANCH_BANGHAP,
    BRANCH_CHUNG,
    BRANCH_GWIMUN,
    BRANCH_HAE,
    BRANCH_HYUNG,
    BRANCH_PA,
    BRANCH_SAMHAP,
    BRANCH_WONJIN,
    BRANCH_YUKHAP,
} from './relationTables';

import type {
    BranchPosition,
    BranchRelation,
} from '../types';

import { hasRelation } from './relationUtils';

type RelationType = BranchRelation['type'];
type RelationElement = NonNullable<BranchRelation['element']>;

interface PairRelationInfo {
    subtype?: string;
}

interface PairRelationChecker {
    type: RelationType;
    score: number;
    check: (
        a: string,
        b: string,
    ) => PairRelationInfo | undefined;
}

interface TripleRelationInfo {
    element: RelationElement;
}

interface TripleRelationChecker {
    type: RelationType;
    score: number;
    check: (
        a: string,
        b: string,
        c: string,
    ) => TripleRelationInfo | undefined;
}

const PAIR_RELATION_CHECKERS: PairRelationChecker[] = [
    {
      type: '충',
      score: 3,
      check: (a, b) =>
        toRelationInfo(isChung(a, b)),
    },
    {
      type: '육합',
      score: 2,
      check: (a, b) =>
        toRelationInfo(isYukhap(a, b)),
    },
    {
      type: '형',
      score: 2,
      check: getHyungInfo,
    },
    {
      type: '파',
      score: 1,
      check: (a, b) =>
        toRelationInfo(isPa(a, b)),
    },
    {
      type: '해',
      score: 1,
      check: (a, b) =>
        toRelationInfo(isHae(a, b)),
    },
    {
        type: '원진',
        score: 1,
        check: (a, b) =>
            toRelationInfo(isWonjin(a, b)),
    },
    {
        type: '귀문',
        score: 1,
        check: (a, b) =>
            toRelationInfo(isGwimun(a, b)),
    },
  ];
  
  const TRIPLE_RELATION_CHECKERS: TripleRelationChecker[] = [
    {
      type: '삼합',
      score: 4,
      check: getSamhapInfo,
    },
    {
      type: '방합',
      score: 4,
      check: getBanghapInfo,
    },
];

function findPairRelations(
    pillars: BranchPosition[],
  ): BranchRelation[] {
    const relations: BranchRelation[] = [];
  
    for (let i = 0; i < pillars.length - 1; i += 1) {
      for (let j = i + 1; j < pillars.length; j += 1) {
        const left = pillars[i];
        const right = pillars[j];
  
        for (const checker of PAIR_RELATION_CHECKERS) {
          const info = checker.check(
            left.branch,
            right.branch,
          );
  
          if (!info) {
            continue;
          }
  
          relations.push({
            type: checker.type,
            pillars: [
              left.position,
              right.position,
            ],
            branches: [
              left.branch,
              right.branch,
            ],
            score: checker.score,
  
            ...(info.subtype
              ? { subtype: info.subtype }
              : {}),
          });
        }
      }
    }
    return relations;
}

function findTripleRelations(
    pillars: BranchPosition[],
  ): BranchRelation[] {
    const relations: BranchRelation[] = [];
  
    for (let i = 0; i < pillars.length - 2; i += 1) {
      for (let j = i + 1; j < pillars.length - 1; j += 1) {
        for (let k = j + 1; k < pillars.length; k += 1) {
          const first = pillars[i];
          const second = pillars[j];
          const third = pillars[k];
  
          for (
            const checker of TRIPLE_RELATION_CHECKERS
          ) {
            const info = checker.check(
              first.branch,
              second.branch,
              third.branch,
            );
  
            if (!info) {
              continue;
            }
  
            relations.push({
              type: checker.type,
              pillars: [
                first.position,
                second.position,
                third.position,
              ],
              branches: [
                first.branch,
                second.branch,
                third.branch,
              ],
              element: info.element,
              score: checker.score,
            });
          }
        }
      }
    }
  
    return relations;
}

function toRelationInfo(
    matched: boolean,
) : PairRelationInfo | undefined {
    return matched ? {} : undefined;
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

export function isWonjin(a: string, b: string): boolean {
    return hasRelation(BRANCH_WONJIN, a, b);
}

export function isGwimun(a: string, b: string): boolean {
    return hasRelation(BRANCH_GWIMUN, a, b);
}

export function getSamhapInfo(
    a: string,
    b: string,
    c: string,
) {
    //console.log('BRANCH_SAMHAP =', BRANCH_SAMHAP);
    //console.log('isArray =', Array.isArray(BRANCH_SAMHAP));
    //console.log('BRANCH_BANGHAP =', BRANCH_BANGHAP);
    //console.log('isArray(BANGHAP) =', Array.isArray(BRANCH_BANGHAP));
    
    const inputBranches = [...new Set([a, b, c])];
  
    if (inputBranches.length !== 3) {
      return undefined;
    }
  
    return BRANCH_SAMHAP.find(({ branches }) =>
      branches.every(branch =>
        inputBranches.includes(branch),
      ),
    );
}
  
export function isSamhap(
    a: string,
    b: string,
    c: string,
  ): boolean {
    return getSamhapInfo(a, b, c) !== undefined;
}

export function getBanghapInfo(
    a: string,
    b: string,
    c: string,
  ) {
    const inputBranches = [...new Set([a, b, c])];
  
    if (inputBranches.length !== 3) {
      return undefined;
    }
  
    return BRANCH_BANGHAP.find(({ branches }) =>
      branches.every(branch =>
        inputBranches.includes(branch),
      ),
    );
}

export function findBranchRelations(
    pillars: BranchPosition[],
  ): BranchRelation[] {
    return [
      ...findPairRelations(pillars),
      ...findTripleRelations(pillars),
    ];
}