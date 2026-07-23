  
  import { getStemElement } from './element';

  import {
  calculateTenGod,
  getStemYinYang
} from './tenGod';

  import type {
  Branch,
  HiddenStem,
  HiddenStemDefinition,
  Stem
} from './types';
  
const BRANCH_HIDDEN_STEMS: Record<
    Branch,
    HiddenStemDefinition[]
  > = {
    子: [
      { stem: '壬', role: 'initial' },
      { stem: '癸', role: 'main' },
    ],
  
    丑: [
      { stem: '癸', role: 'initial' },
      { stem: '辛', role: 'middle' },
      { stem: '己', role: 'main' },
    ],
  
    寅: [
      { stem: '戊', role: 'initial' },
      { stem: '丙', role: 'middle' },
      { stem: '甲', role: 'main' },
    ],
  
    卯: [
      { stem: '甲', role: 'initial' },
      { stem: '乙', role: 'main' },
    ],
  
    辰: [
      { stem: '乙', role: 'initial' },
      { stem: '癸', role: 'middle' },
      { stem: '戊', role: 'main' },
    ],
  
    巳: [
      { stem: '戊', role: 'initial' },
      { stem: '庚', role: 'middle' },
      { stem: '丙', role: 'main' },
    ],
  
    午: [
      { stem: '丙', role: 'initial' },
      { stem: '己', role: 'middle' },
      { stem: '丁', role: 'main' },
    ],
  
    未: [
      { stem: '丁', role: 'initial' },
      { stem: '乙', role: 'middle' },
      { stem: '己', role: 'main' },
    ],
  
    申: [
      { stem: '戊', role: 'initial' },
      { stem: '壬', role: 'middle' },
      { stem: '庚', role: 'main' },
    ],
  
    酉: [
      { stem: '庚', role: 'initial' },
      { stem: '辛', role: 'main' },
    ],
  
    戌: [
      { stem: '辛', role: 'initial' },
      { stem: '丁', role: 'middle' },
      { stem: '戊', role: 'main' },
    ],
  
    亥: [
      { stem: '戊', role: 'initial' },
      { stem: '甲', role: 'middle' },
      { stem: '壬', role: 'main' },
    ],
  };

export function getHiddenStems(
    branch: Branch,
  ): HiddenStemDefinition[] {
    const hiddenStems = BRANCH_HIDDEN_STEMS[branch];

    if (!hiddenStems){
        throw new Error (
            `알 수 없는 지지입니다: ${branch}`,
        );
    }
    return hiddenStems;
  }

export function getMainHiddenStem(
    branch: Branch,
  ): string {
    const mainStem = getHiddenStems(
        branch,
    ).find(
        hiddenStem =>
            hiddenStem.role === 'main',
    );

    if (!mainStem) {
        throw new Error(
            `지지의 본기를 찾을 수 없습니다: ${branch}`,
        );
    }

    return mainStem.stem;
  }

export function calculateHiddenStems(
    dayStem: Stem,
    branch: Branch,
  ): HiddenStem[] {
    return getHiddenStems(branch).map(
      ({ stem, role }) => ({
        stem,
        role,
        element: getStemElement(stem),
        yinYang: getStemYinYang(stem),
        tenGod: calculateTenGod(
          dayStem,
          stem,
        ),
      }),
    );
  }