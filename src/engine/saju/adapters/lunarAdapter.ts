import { Lunar, Solar } from 'lunar-javascript';

import type {
  Branch,
  CalendarType,
  Pillar,
  Stem,
} from '../types';

export type LunarAdapterInput = {
  calendarType: CalendarType;
  isLeapMonth: boolean;

  year: number;
  month: number;
  day: number;

  hour: number;
  minute: number;
};

export type LunarAdapterResult = {
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
  hourPillar: Pillar;
};

function createPillar(full: string): Pillar {
  return {
    stem: full.charAt(0) as Stem,
    branch: full.charAt(1) as Branch,
    full,
  };
}

export function calculateWithLunarLibrary(
  input: LunarAdapterInput,
): LunarAdapterResult {
  let solar: any;
  let lunar: any;

  if (input.calendarType === 'solar') {
    solar = Solar.fromYmdHms(
      input.year,
      input.month,
      input.day,
      input.hour,
      input.minute,
      0,
    );

    lunar = solar.getLunar();
  } else {
    const lunarMonth = input.isLeapMonth
      ? -input.month
      : input.month;

    lunar = Lunar.fromYmdHms(
      input.year,
      lunarMonth,
      input.day,
      input.hour,
      input.minute,
      0,
    );

    solar = lunar.getSolar();
  }

  const eightChar = lunar.getEightChar();

  return {
    solarDate: {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay(),
    },

    lunarDate: {
      year: lunar.getYear(),
      month: Math.abs(lunar.getMonth()),
      day: lunar.getDay(),
      isLeapMonth: lunar.getMonth() < 0,
    },

    yearPillar: createPillar(eightChar.getYear()),
    monthPillar: createPillar(eightChar.getMonth()),
    dayPillar: createPillar(eightChar.getDay()),
    hourPillar: createPillar(eightChar.getTime()),
  };
}