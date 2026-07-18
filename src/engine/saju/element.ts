import type {
    Element,
    ElementCount,
    Pillar,
} from './types';

const STEM_ELEMENT: Record<string, Element> = {
  甲: 'wood',
  乙: 'wood',

  丙: 'fire',
  丁: 'fire',

  戊: 'earth',
  己: 'earth',

  庚: 'metal',
  辛: 'metal',

  壬: 'water',
  癸: 'water',
};

const BRANCH_ELEMENT: Record<string, Element> = {
  寅: 'wood',
  卯: 'wood',

  巳: 'fire',
  午: 'fire',

  辰: 'earth',
  戌: 'earth',
  丑: 'earth',
  未: 'earth',

  申: 'metal',
  酉: 'metal',

  子: 'water',
  亥: 'water',
};

export function getStemElement(
  stem: string,
): Element {
  const element = STEM_ELEMENT[stem];

  if (!element) {
    throw new Error(
      `알 수 없는 천간입니다: ${stem}`,
    );
  }

  return element;
}

export function getBranchElement(
  branch: string,
): Element {
  const element = BRANCH_ELEMENT[branch];

  if (!element) {
    throw new Error(
      `알 수 없는 지지입니다: ${branch}`,
    );
  }

  return element;
}

export function calculateElementCount(
  pillars: Pillar[],
): ElementCount {
  const count: ElementCount = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  pillars.forEach((pillar) => {
    const stemElement =
      getStemElement(pillar.stem);

    const branchElement =
      getBranchElement(pillar.branch);

    count[stemElement] += 1;
    count[branchElement] += 1;
  });

  return count;
}