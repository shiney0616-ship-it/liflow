import type {
    Branch,
    HiddenStem,
    HiddenStemRole,
    Stem,
} from '../../types';
  
  import { getStemElement } from '../../element';
import { calculateHiddenStems } from '../../hiddenStem';
  
  const ROOT_ROLE_PRIORITY: Record<HiddenStemRole, number> = {
    main: 3,
    middle: 2,
    initial: 1,
  };
  
  /**
   * 해당 지지에서 일간이 통근하는 지장간을 찾는다.
   *
   * 우선순위:
   * main > middle > initial
   *
   * 통근하는 지장간이 없으면 undefined를 반환한다.
   */
  export function findRootHiddenStem(
    branch: Branch,
    dayStem: Stem,
  ): HiddenStem | undefined {
    const dayStemElement = getStemElement(dayStem);
    const hiddenStems = calculateHiddenStems(
        dayStem,
        branch,
      );
  
    let matchedHiddenStem: HiddenStem | undefined;
  
    for (const hiddenStem of hiddenStems) {
      const hiddenStemElement =
        getStemElement(hiddenStem.stem);
  
      if (hiddenStemElement !== dayStemElement) {
        continue;
      }
  
      if (
        !matchedHiddenStem ||
        ROOT_ROLE_PRIORITY[hiddenStem.role] >
          ROOT_ROLE_PRIORITY[matchedHiddenStem.role]
      ) {
        matchedHiddenStem = hiddenStem;
      }
    }
  
    return matchedHiddenStem;
  }