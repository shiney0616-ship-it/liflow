import { calculateWithLunarLibrary } from './adapters/lunarAdapter';

import {
    calculateElementCount,
    getBranchElement,
    getStemElement,
} from './element';

import type {
    SajuInput,
    SajuResult,
} from './types';

export function calculateSaju(
  input: SajuInput,
): SajuResult {

  const hour = input.unknownTime
    ? 12
    : input.hour ?? 0;

  const minute = input.unknownTime
    ? 0
    : input.minute ?? 0;

  const calculated = calculateWithLunarLibrary({
    calendarType: input.calendarType,
    isLeapMonth: input.isLeapMonth,

    year: input.year,
    month: input.month,
    day: input.day,

    hour,
    minute,
  });

  const yearPillar = {
    ...calculated.yearPillar,
    stemElement: getStemElement(
        calculated.yearPillar.stem,
    ),
    branchElement: getBranchElement(
        calculated.yearPillar.branch,
    ),
    };
      
  const monthPillar = {
        ...calculated.monthPillar,
        stemElement: getStemElement(
          calculated.monthPillar.stem,
        ),
        branchElement: getBranchElement(
          calculated.monthPillar.branch,
        ),
      };
      
  const dayPillar = {
        ...calculated.dayPillar,
        stemElement: getStemElement(
          calculated.dayPillar.stem,
        ),
        branchElement: getBranchElement(
          calculated.dayPillar.branch,
        ),
      };
      
  const timePillar = input.unknownTime
        ? undefined
        : {
            ...calculated.timePillar,
            stemElement: getStemElement(
              calculated.timePillar.stem,
            ),
            branchElement: getBranchElement(
              calculated.timePillar.branch,
            ),
          };

  const pillars = [
            yearPillar,
            monthPillar,
            dayPillar,
            ...(timePillar ? [timePillar] : []),
          ];
          
  const elementCount =
            calculateElementCount(pillars);

  return {
    input,

    solarDate: calculated.solarDate,
    lunarDate: calculated.lunarDate,

    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,

    elementCount,
  };
}