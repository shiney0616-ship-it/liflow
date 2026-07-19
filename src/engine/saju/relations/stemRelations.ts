import {
    STEM_CHUNG,
    STEM_HAP,
} from './relationTables';
  
  import type {
    StemPosition,
    StemRelation,
} from '../types';

import { hasRelation } from './relationUtils';
  
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
  
    return relations;
  }