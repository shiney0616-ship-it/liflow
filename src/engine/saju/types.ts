export { calculateSaju } from './calculateSaju';

export type CalendarType = 'solar' | 'lunar';

export type Gender = 'male' | 'female';

export type SajuInput = {
    name: string;
    gender: Gender;
    calendarType: CalendarType;
    isLeapMonth: boolean;
  
    year: number;
    month: number;
    day: number;
  
    hour?: number;
    minute?: number;
    unknownTime: boolean;
  };  

export type Element =
  | 'wood'
  | 'fire'
  | 'earth'
  | 'metal'
  | 'water';

export type ElementCount = Record<Element, number>;

export type YinYang = 'yang' | 'yin';

export type TenGod =
  | '비견'
  | '겁재'
  | '식신'
  | '상관'
  | '편재'
  | '정재'
  | '편관'
  | '정관'
  | '편인'
  | '정인';

export type HiddenStemRole =
| 'initial'
| 'middle'
| 'main';

export type HiddenStem = {
    stem: string;
    role: HiddenStemRole;

    element: Element;
    yinYang: YinYang;
    tenGod?: TenGod;
}

export type TwelveLifeStage =
  | '장생'
  | '목욕'
  | '관대'
  | '건록'
  | '제왕'
  | '쇠'
  | '병'
  | '사'
  | '묘'
  | '절'
  | '태'
  | '양';

export type PillarPosition =
  | 'year'
  | 'month'
  | 'day'
  | 'time';

export type BranchRelationType =
  | '충'
  | '육합'
  | '형'
  | '파'
  | '해'
  | '삼합'
  | '방합'
  | '원진'
  | '귀문';

export interface BranchPosition {
    position: PillarPosition;
    branch: string;
}
  
export interface BranchRelation {
    type: BranchRelationType;
    subtype?: string;
    pillars: PillarPosition[];
    branches: string[];
    element?: Element;
    score: number;
}

export type StemRelationType =
    | '간합';

export interface StemPosition {
    position: PillarPosition;
    stem: string;
}

export interface StemRelation {
    type :StemRelationType;
    pillars: PillarPosition[];
    stems: string[];
    element?: Element;
    score: number;
}

export type Pillar = {
    stem: string;
    branch: string;
    full: string;
  
    stemElement?: Element;
    branchElement?: Element;
  
    stemYinYang?: YinYang;
    stemTenGod?: TenGod;

    hiddenStems?: HiddenStem[];

    branchMainStem?: string;
    branchTenGod?:TenGod;

    twelveLifeStage?: TwelveLifeStage;
  };

export type SajuResult = {
  input: SajuInput;

  solarDate: {
    year: number;
    month: number;
    day: number;
  };

  lunarDate: {
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
  };

  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  timePillar?: Pillar;

  elementCount: ElementCount;
};
