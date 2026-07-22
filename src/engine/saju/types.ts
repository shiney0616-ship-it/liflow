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

export type ElementRelation =
  | 'same'
  | 'generates'
  | 'generatedBy'
  | 'controls'
  | 'controlledBy';

export type YinYang = 'yang' | 'yin';

export type Stem =
  | '甲'
  | '乙'
  | '丙'
  | '丁'
  | '戊'
  | '己'
  | '庚'
  | '辛'
  | '壬'
  | '癸';

export type Branch = 
  | '子'
  | '丑'
  | '寅'
  | '卯'
  | '辰'
  | '巳'
  | '午'
  | '未'
  | '申'
  | '酉'
  | '戌'
  | '亥';

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
    stem: Stem;
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
    branch: Branch;
}
  
export interface BranchRelation {
    type: BranchRelationType;
    subtype?: string;
    pillars: PillarPosition[];
    branches: Branch[];
    element?: Element;
    score: number;
}

export type StemRelationType =
    | '간합'
    | '간충'
    | '쟁합'
    | '투합';

export interface StemPosition {
    position: PillarPosition;
    stem: Stem;
}

export interface StemRelation {
    type :StemRelationType;
    relationKind: 'pair' | 'multi';
    pillars: PillarPosition[];
    stems: Stem[];
    element?: Element;
    score: number;
    sharedStem?: Stem;
    sharedPillar?: PillarPosition;
}

export type Pillar = {
    stem: Stem;
    branch: Branch;
    full: string;
  
    stemElement?: Element;
    branchElement?: Element;
  
    stemYinYang?: YinYang;
    stemTenGod?: TenGod;

    hiddenStems?: HiddenStem[];

    branchMainStem?: Stem;
    branchTenGod?:TenGod;

    twelveLifeStage?: TwelveLifeStage;
};

export type GongmangResult = {
  branches: [Branch, Branch];
  hitPillars: PillarPosition[];
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

  gongmang : GongmangResult;
};

export type MonthStrengthEffect =
  | 'support'
  | 'drain'
  | 'suppress';

export interface MonthStrengthResult {
  monthBranch: Branch;
  monthElement: Element;
  dayMasterElement: Element;

  relation: ElementRelation;
  effect: MonthStrengthEffect;

  score: number;
  maxAbsScore: number;
}