import {
  STEM_CHUNG,
  STEM_HAP,
} from './relationTables';
  
import type {
  PillarPosition,
  StemPosition,
  StemRelation,
} from '../types';

import {
  hasRelation,
  isYangStem
} from './relationUtils';
  
export function getStemHapInfo(
    a: string,
    b: string,
) {
  return STEM_HAP.find(({ stems }) => {
    const [x, y] = stems;
  
    return (
        (x === a && y === b) ||
        (x === b && y === a)
    );
  });
}
  
export function isStemHap(
  a: string,
  b: string,
): boolean {
  return getStemHapInfo(a, b) !== undefined;
}

export function getStemChungInfo(
  a: string,
  b: string,
) {
  return hasRelation(STEM_CHUNG, a, b)
    ? {}
    : undefined;
}

export function isStemChung(
  a: string,
  b: string,
): boolean {
  return hasRelation(STEM_CHUNG, a, b);
}

export function findStemMultiRelations(
  relations: StemRelation[],
): StemRelation[] {
  const hapRelations = relations.filter(
    relation => relation.type === '간합',
  );

  const hapRelationsByPillar =
    new Map<PillarPosition, StemRelation[]>();

  for (const relation of hapRelations) {
    for (const pillar of relation.pillars) {
      const currentRelations =
        hapRelationsByPillar.get(pillar) ?? [];

      currentRelations.push(relation);

      hapRelationsByPillar.set(
        pillar,
        currentRelations,
      );
    }
  }

  const multiRelations: StemRelation[] = [];

  for (
    const [sharedPillar, relatedHaps]
    of hapRelationsByPillar
  ) {
    if (relatedHaps.length < 2) {
      continue;
    }

    const firstRelation = relatedHaps[0];

    const sharedStemIndex =
      firstRelation.pillars.indexOf(sharedPillar);

    const sharedStem =
      firstRelation.stems[sharedStemIndex];

    const otherPillars: PillarPosition[] = [];
    const otherStems: string[] = [];

    for (const relation of relatedHaps) {
      const sharedIndex =
        relation.pillars.indexOf(sharedPillar);

      const otherIndex =
        sharedIndex === 0 ? 1 : 0;

      otherPillars.push(
        relation.pillars[otherIndex],
      );

      otherStems.push(
        relation.stems[otherIndex],
      );
    }

    multiRelations.push({
      type: isYangStem(sharedStem) ? '투합' : '쟁합',
      relationKind: 'multi',
      pillars: [
        sharedPillar,
        ...otherPillars,
      ],
      stems: [
        sharedStem,
        ...otherStems,
      ],
      score: 2,
    });
  }

  return multiRelations;
}
  
export function findStemRelations(
  stems: StemPosition[],
): StemRelation[] {
  const relations: StemRelation[] = [];
  
  for (let i = 0; i < stems.length - 1; i += 1) {
    for (let j = i + 1; j < stems.length; j += 1) {
      const left = stems[i];
      const right = stems[j];

      const hapInfo = getStemHapInfo(
        left.stem,
        right.stem,
      );

      if (hapInfo) {
        relations.push({
          type: '간합',
          relationKind: 'pair',
          pillars: [
            left.position,
            right.position,
          ],
          stems: [
            left.stem,
            right.stem,
          ],
          element: hapInfo.element,
          score: 3,
        });
      }
  
      const isChung = isStemChung(
        left.stem,
        right.stem,
      );
  
      if (isChung) {
        relations.push({
          type: '간충',
          relationKind: 'pair',
          pillars: [
            left.position,
            right.position,
          ],
          stems: [
            left.stem,
            right.stem,
          ],
          score: 3,
        });
      }
    }
  }
  
  const multiRelations =
  findStemMultiRelations(relations);
  
  return [
    ...relations,
    ...multiRelations,
  ];
}