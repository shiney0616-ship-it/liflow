import type {
  Branch,
  Stem,
} from '../types';

export type StemBranch = `${Stem}${Branch}`;

export interface GongmangGroup {
  pillars: readonly StemBranch[];
  emptyBranches: readonly [Branch, Branch];
}

export const GONGMANG_GROUPS: readonly GongmangGroup[] = [
  {
    // 갑자순
    pillars: [
      '甲子',
      '乙丑',
      '丙寅',
      '丁卯',
      '戊辰',
      '己巳',
      '庚午',
      '辛未',
      '壬申',
      '癸酉',
    ],
    emptyBranches: ['戌', '亥'],
  },
  {
    // 갑술순
    pillars: [
      '甲戌',
      '乙亥',
      '丙子',
      '丁丑',
      '戊寅',
      '己卯',
      '庚辰',
      '辛巳',
      '壬午',
      '癸未',
    ],
    emptyBranches: ['申', '酉'],
  },
  {
    // 갑신순
    pillars: [
      '甲申',
      '乙酉',
      '丙戌',
      '丁亥',
      '戊子',
      '己丑',
      '庚寅',
      '辛卯',
      '壬辰',
      '癸巳',
    ],
    emptyBranches: ['午', '未'],
  },
  {
    // 갑오순
    pillars: [
      '甲午',
      '乙未',
      '丙申',
      '丁酉',
      '戊戌',
      '己亥',
      '庚子',
      '辛丑',
      '壬寅',
      '癸卯',
    ],
    emptyBranches: ['辰', '巳'],
  },
  {
    // 갑진순
    pillars: [
      '甲辰',
      '乙巳',
      '丙午',
      '丁未',
      '戊申',
      '己酉',
      '庚戌',
      '辛亥',
      '壬子',
      '癸丑',
    ],
    emptyBranches: ['寅', '卯'],
  },
  {
    // 갑인순
    pillars: [
      '甲寅',
      '乙卯',
      '丙辰',
      '丁巳',
      '戊午',
      '己未',
      '庚申',
      '辛酉',
      '壬戌',
      '癸亥',
    ],
    emptyBranches: ['子', '丑'],
  },
];