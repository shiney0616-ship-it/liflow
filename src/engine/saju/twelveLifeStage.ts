import type {
    TwelveLifeStage,
    YinYang,
} from './types';
  
  import {
    getStemYinYang,
} from './tenGod';
  
  const BRANCHES = [
    '子',
    '丑',
    '寅',
    '卯',
    '辰',
    '巳',
    '午',
    '未',
    '申',
    '酉',
    '戌',
    '亥',
  ] as const;
  
  const TWELVE_LIFE_STAGES: TwelveLifeStage[] = [
    '장생',
    '목욕',
    '관대',
    '건록',
    '제왕',
    '쇠',
    '병',
    '사',
    '묘',
    '절',
    '태',
    '양',
  ];
  
  /**
   * 각 천간의 장생 시작 지지
   *
   * 戊는 丙과 같고,
   * 己는 丁과 같은 화토동궁 방식을 사용한다.
   */
  const LONGEVITY_START_BRANCH: Record<string, string> = {
    甲: '亥',
    乙: '午',
  
    丙: '寅',
    丁: '酉',
  
    戊: '寅',
    己: '酉',
  
    庚: '巳',
    辛: '子',
  
    壬: '申',
    癸: '卯',
  };
  
  function getBranchIndex(
    branch: string,
  ): number {
    const index = BRANCHES.indexOf(
      branch as typeof BRANCHES[number],
    );
  
    if (index === -1) {
      throw new Error(
        '알 수 없는 지지입니다: ' + branch,
      );
    }
  
    return index;
  }
  
  function getDirection(
    yinYang: YinYang,
  ): 1 | -1 {
    return yinYang === 'yang'
      ? 1
      : -1;
  }
  
  export function calculateTwelveLifeStage(
    dayStem: string,
    branch: string,
  ): TwelveLifeStage {
    const startBranch =
      LONGEVITY_START_BRANCH[dayStem];
  
    if (!startBranch) {
      throw new Error(
        '알 수 없는 일간입니다: ' + dayStem,
      );
    }
  
    const startIndex =
      getBranchIndex(startBranch);
  
    const targetIndex =
      getBranchIndex(branch);
  
    const yinYang =
      getStemYinYang(dayStem);
  
    const direction =
      getDirection(yinYang);
  
    /*
     * 양간은 지지 순서로 순행하고,
     * 음간은 반대 방향으로 역행한다.
     *
     * JavaScript의 나머지 연산은 음수가 될 수 있으므로
     * 마지막에 12를 다시 더한 뒤 % 12를 적용한다.
     */
    const distance =
      direction === 1
        ? targetIndex - startIndex
        : startIndex - targetIndex;
  
    const stageIndex =
      (distance + 12) % 12;
  
    return TWELVE_LIFE_STAGES[
      stageIndex
    ];
  }