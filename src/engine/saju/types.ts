export { calculateSaju } from './calculateSaju';

export type CalendarType = 'solar' | 'lunar';

export type Gender = 'male' | 'female';

export type Element =
  | 'wood'
  | 'fire'
  | 'earth'
  | 'metal'
  | 'water';

export type ElementCount = Record<Element, number>;

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

export type Pillar = {
  stem: string;
  branch: string;
  full: string;

  stemElement?: Element;
  branchElement?: Element;
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